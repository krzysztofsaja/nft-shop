import {Button} from "@mantine/core";
import {placeOrder} from "../../services/api";
import {openConfirmModal} from '@mantine/modals';
import {useContext, useEffect} from "react";
import {ShoppingContext} from "../../state/cart-shopping.state";
import {PlaceCardOrder} from "../../types/cart-order";
import {joiResolver, useForm} from '@mantine/form';
import Joi from 'joi';

import ConfirmationDialogContent from "./confirmation-dialog-content";
import {ContractContext} from "../../state/contract.state";
import {notify, notifyError, notifyTransaction, notifyTransactionUpdate} from "../../helpers/notify";
import {BigNumber, ContractReceipt, ContractTransaction} from "ethers";
import {useNetwork} from "wagmi";
import {truncateAddress} from "../../helpers/utility";

function CheckoutButton() {
    const {shoppingState, reset, setLoading, getTotalPrice} = useContext(ShoppingContext);
    const {contractState} = useContext(ContractContext);
    const {chain} = useNetwork();

    const formSchema = Joi.object<PlaceCardOrder>({
        createdAt: Joi.date(),
        products: Joi.array().min(1),
        txHash: Joi.any(),
        chainId: Joi.number().min(1)
    })
    const cartOrderForm = useForm<PlaceCardOrder>({
        validateInputOnChange: true,
        initialValues: getCartOrder(),
        validate: joiResolver(formSchema)
    });

    function getCartOrder(): PlaceCardOrder {
        return {
            chainId: chain?.id || 0,
            txHash: '',
            products: shoppingState.products,
            createdAt: new Date().toISOString()
        }
    }

    useEffect(() => {
        cartOrderForm.setValues(getCartOrder());
    }, [shoppingState.products, contractState.contract, chain])

    function openConfirmation() {
        openConfirmModal({
            title: 'Please confirm your order',
            styles: (theme => ({header: {fontSize: 20, fontWeight: 700}})),
            children: (<ConfirmationDialogContent></ConfirmationDialogContent>),
            labels: {confirm: 'Confirm', cancel: 'Cancel'},
            onCancel: () => console.log('Cancel'),
            onConfirm: () => handleOnConfirm(),
        })
    }

    async function handleOnConfirm() {
        setLoading(true);
        const cartOrder = getCartOrder();
        let tx: ContractTransaction;
        try {
            tx = await transferTokensToVault(cartOrder.products.map(product => product.id))
        } catch (e) {
            setLoading(false);
            notifyError(e);
            return;
        }
        placeOrder({...getCartOrder(), txHash: tx.hash})
            .then(() => {
                notify('Saved in FireStore DB', 'Your order was saved in our FireStore DB. Check Order Page', 'success');
                reset();
            }).catch(error => {
            console.error(error);
            setLoading(false);
            notifyError(error, 'Sorry, but there were an error. Your order is not placed', true);
        })
    }

    async function transferTokensToVault(tokenIds: number[]): Promise<ContractTransaction> {
        if (!contractState.contract) {
            throw new Error('You need to connect to the contract first');
        }
        const GAS_LIMIT = "800000";
        const tx = await contractState.contract.transferToVault(tokenIds, {
            value: BigNumber.from(getTotalPrice()),
            gasLimit: BigNumber.from(GAS_LIMIT).mul(BigNumber.from(tokenIds.length)),
        });
        const notificationId = notifyTransaction(tx);
        console.log(tx);
        const res: ContractReceipt = await tx.wait();
        console.log(res);
        const vaultAddress = process.env.NEXT_PUBLIC_VAULT_ADDRESS as string;
        notifyTransactionUpdate(notificationId,
            `You successfully gave us your funds. Tokens where transferred to Safe Vault at ${truncateAddress(vaultAddress)}`,
            'success')

        return tx;
    }

    return <Button disabled={!cartOrderForm.isValid() || shoppingState.loading}
                   onClick={openConfirmation}
                   loading={shoppingState.loading}
                   type="button"
                   fullWidth
                   variant="filled">
        Complete Checkout
    </Button>
}

export default CheckoutButton;
