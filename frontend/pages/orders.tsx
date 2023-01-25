import type {NextPage} from 'next';
import {AppShell, Box, Container, Group, Header, Text} from '@mantine/core';
import Link from "next/link";
import ThemeToggleButton from "../components/layout/theme-toggle-button";
import OrdersOverview from "../components/orders-overview/orders-overview";

const Orders: NextPage = () => {
    return (
        <AppShell
            layout="alt"
            padding="md"
            header={<Header
                sx={{left: 0, display: 'flex', alignItems: 'center'}}
                fixed={false}
                position={{top: 0, left: 0}}
                height={60}
                p="xs">
                <Box w={'100%'} component="header" sx={{textAlign: 'center'}}>
                    <Container>
                        <Group position={"apart"}>
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
                                    <Link href="/">Orders</Link>
                                </Text>
                            </Group>

                            <span style={{flexGrow: 1}}/>
                            <ThemeToggleButton/>
                        </Group>
                    </Container>
                </Box>
            </Header>}
        >
            <Container>
                <Text mb="lg" mt="lg" weight={700}>Table of Placed Orders in FireBase</Text>
                <OrdersOverview></OrdersOverview>
            </Container>
        </AppShell>
    );
};

export default Orders;
