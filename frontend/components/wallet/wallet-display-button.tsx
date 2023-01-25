import {ActionIcon, Group, Popover, Stack, Text, Title} from '@mantine/core';
import {FC, useState} from 'react';
import {IconWallet} from '@tabler/icons';
import {truncateAddress} from '../../utils/utility';
import {useAccount, useBalance, useNetwork} from 'wagmi';
import EthFormatter from "../layout/eth-formatter";

const WalletDisplayButton: FC = () => {
  // const {wallet} = useWalletContext();
  const {address, isConnected, connector} = useAccount();
  const {data} = useBalance({
    address,
  });
  const {chain} = useNetwork();

  const [opened, setOpened] = useState(false);
  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      styles={(theme => ({dropdown: {right: 70}}))}
      position="bottom"
      withArrow
    >
        <Popover.Target>
            <ActionIcon disabled={!isConnected} onClick={() => setOpened(o => !o)}>
                <IconWallet size="1.2em" />
            </ActionIcon>
        </Popover.Target>

        <Popover.Dropdown>
            {isConnected && connector && address ? (
                <Group>
                    <Stack spacing={0} ta="left">
                        {/* Network Details */}
                        <Text color="dimmed" size="sm" mb={4} mt="sm">Network</Text>
                        <Text>{chain && chain.name} Id: {chain && chain.id}</Text>
                        {/* Wallet Details */}
                        <Text color="dimmed" size="sm" mb={4} mt="sm">
                            Wallet ID
                        </Text>
                        <Text>{truncateAddress(address)}</Text>

                        {/* Balance */}
                        <Text color="dimmed" size="sm" mb={4} mt="sm">
                            Balance
                        </Text>
                        {data && <Text>
                          <EthFormatter inEth={data.value}></EthFormatter> </Text>}
                    </Stack>
                </Group>
            ) : (
                <Title p="lg">Wallet not connected.</Title>
            )}
        </Popover.Dropdown>
    </Popover>
  );
};

export default WalletDisplayButton;
