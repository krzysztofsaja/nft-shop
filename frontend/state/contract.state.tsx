import {createContext, useState} from 'react';
import {CollectionInfo} from "../types/collection-info.type";
import {MyERC721} from "../types/typechain";

interface ContractState {
    contract: MyERC721 | undefined;
    collectionInfo: CollectionInfo;
    loading: boolean;
}

interface ContractContextProps {
    contractState: ContractState;
    setLoading: (isLoading: boolean) => void;
    setContract: (contract: MyERC721 | undefined) => void;
    setCollectionInfo: (collectionInfo: CollectionInfo) => void;
}

const initialState: ContractState = {
    contract: undefined,
    collectionInfo: {maxSupply: 0, name: '', symbol: '', baseURI: '', minted: 0},
    loading: false
}

export const ContractContext = createContext<ContractContextProps>({
    contractState: initialState,
    setLoading: (isLoading: boolean) => {
    },
    setContract: (contract: MyERC721 | undefined) => {
    },
    setCollectionInfo: (info: CollectionInfo) => {
    },
});

export function ContractProvider(props: any) {
    const [state, setState] = useState<ContractState>(initialState);

    function setLoading(isLoading: boolean) {
        setState({
            ...state,
            loading: isLoading
        });
    }

    function setContract(contract: MyERC721 | undefined) {
        setState({
            ...state,
            contract
        });
    }

    function setCollectionInfo(info: CollectionInfo) {
        setState({
            ...state,
            collectionInfo: info
        });
    }

    return (
        <ContractContext.Provider
            value={{contractState: state, setLoading, setContract, setCollectionInfo}}>
            {props.children}
        </ContractContext.Provider>
    );
}

