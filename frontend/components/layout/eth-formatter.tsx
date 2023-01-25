import {BigNumber, utils} from "ethers";
import {Group, Text} from "@mantine/core";
import {IconCurrencyEthereum} from '@tabler/icons';

function EthFormatter({inEth}: {inEth: string | BigNumber}) {
    const formatted = utils.formatEther(inEth);
    return <Group spacing={2}>{(+formatted).toFixed(2)} <IconCurrencyEthereum size="1em" /> </Group>
}

export default EthFormatter;
