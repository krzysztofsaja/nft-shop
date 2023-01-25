import {Avatar, createStyles, Grid, Indicator, Stack, Text} from '@mantine/core';
import {NftProduct} from "../../types/nft-product.type";
import EthFormatter from "../layout/eth-formatter";
import DollarFromEth from "../layout/dollar-from-eth-formatter";

const useStyles = createStyles((theme) => ({
    closeButton: {
        cursor: 'pointer'
    },

    itemIcon: {
        padding: theme.spacing.xs,
        marginRight: theme.spacing.md,
    },

    itemTitle: {
        marginBottom: theme.spacing.xs / 2,
    }
}));

export function ProductCartElement({product, removeProduct}: { product: NftProduct, removeProduct: () => void }) {
    const {classes} = useStyles();

    return (
        <Grid gutter="xs">
            <Grid.Col xs={2} sm={3} span={3}>
                <Indicator className={classes.closeButton}
                           color="primary"
                           onClick={removeProduct} label={'X'} inline size={30}>
                    <Avatar size="lg" src={product.img}/>
                </Indicator>
            </Grid.Col>
            <Grid.Col xs={8} sm={5} span={5}>
                <Stack pl="md" spacing="xs" align="start" justify="flex-start">
                    <Text truncate weight={700} size="sm" className={classes.itemTitle}>
                        {product.title}
                    </Text>
                </Stack>
            </Grid.Col>
            <Grid.Col xs={2} sm={4} span={4}>
                <Stack align="end" spacing={0} justify="flex-end">
                    <Text ta="right" weight={700} size="sm" className={classes.itemTitle}>
                        <EthFormatter inEth={product.price}></EthFormatter>
                    </Text>
                    <Text ta="right" size="xs" color="dimmed">
                        <DollarFromEth inEth={product.price}/>
                    </Text>
                </Stack>
            </Grid.Col>
        </Grid>
    );
}
