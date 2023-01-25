import {Box, Container, Group, Text} from "@mantine/core";
import Link from "next/link";
import WalletConnectionButton from "../wallet/wallet-connection-button";
import WalletDisplayButton from "../wallet/wallet-display-button";
import ThemeToggleButton from "./theme-toggle-button";

function Header() {
    return <Box component="header" sx={{textAlign: 'center'}}>
            <Container>
                <Group>
                    <Text
                        variant="gradient"
                        gradient={{from: 'primary', to: 'secondary', deg: 45}}
                        sx={{fontSize: '1.5em', fontWeight: 800}}
                        inline
                    >
                        <Link href="/">Shop</Link>
                    </Text>
                    <Text
                        variant="gradient"
                        sx={{fontSize: '1.5em', fontWeight: 800}}
                        inline
                    >
                        <Link href="/orders">Orders</Link>
                    </Text>

                    {/* pushes the succeeding contents to the right */}
                    <span style={{flexGrow: 1}}/>
                    <WalletConnectionButton/>
                    <WalletDisplayButton/>
                    <ThemeToggleButton/>
                </Group>
            </Container>
        </Box>
}

export default Header;
