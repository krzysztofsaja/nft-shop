import {Button, Card, createStyles, Group, Image, Stack, Text} from '@mantine/core';
import {NftProduct} from "../../types/nft-product.type";
import EthFormatter from "../layout/eth-formatter";
import DollarFromEth from "../layout/dollar-from-eth-formatter";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
    },
    imageSection: {
        padding: theme.spacing.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    }
}));

export function ProductGalleryElement({product, isInCart, addProduct}: {
    product: NftProduct,
    isInCart: boolean,
    addProduct: () => void
}) {
    const {classes} = useStyles();

    return (
        <Card withBorder radius="md" className={classes.card}>
            <Card.Section className={classes.imageSection}>
                <Image src={product.img} alt={product.title}/>
            </Card.Section>

            <Stack mt="md" mb="md">
                <Text weight={500}>{product.title}</Text>
            </Stack>
            <Stack>
                <Group spacing='md' position="apart">
                    <Text size="xl"
                          weight={700}
                          sx={{lineHeight: 1}}>
                        <EthFormatter inEth={product.price}></EthFormatter>
                    </Text>
                    <Text size="sm"
                          color="dimmed"
                          weight={500}
                          sx={{lineHeight: 1}}
                          mt={3}>
                        <DollarFromEth inEth={product.price}></DollarFromEth>
                    </Text>
                </Group>
                <Button disabled={isInCart}
                        onClick={addProduct}
                        p="xs"
                        radius="xl"
                        style={{flex: 1}}>
                    Buy
                </Button>
            </Stack>
        </Card>
    );
}
