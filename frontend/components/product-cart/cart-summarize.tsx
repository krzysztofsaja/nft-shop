import {Group, Stack, Text} from "@mantine/core";
import {utils} from "ethers";
import DollarFromEth from "../layout/dollar-from-eth-formatter";

function CartSummarize(props: {inEth: string}) {
    return <Group position="apart" align="start">
        <Group>
            <Text weight={600} size='lg'>Total</Text>
        </Group>
        <Stack spacing="xs" align={'flex-end'}>
            <Text weight={500} size='md'>{utils.formatEther(props.inEth)} ETH </Text>
            <Text color="dimmed" weight={500} size='sm'>
                <DollarFromEth inEth={props.inEth}></DollarFromEth>
            </Text>
        </Stack>
    </Group>
}

export default CartSummarize;
