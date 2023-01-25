import {List, Text, ThemeIcon} from "@mantine/core";
import {IconCircleDashed} from "@tabler/icons";

function ConfirmationDialogContent() {
    return <>
        <Text mb="md" size="md">
            You are going to place an order. Here are steps that will take place
        </Text>
        <List
            spacing="xs"
            size="sm"
            mb="lg"
            center
            icon={
                <ThemeIcon color="teal" size={24} radius="xl">
                    <IconCircleDashed size={16}/>
                </ThemeIcon>
            }
        >
            <List.Item>Sign a transaction</List.Item>
            <List.Item>Selected tokens will be transferred to Safe Vault</List.Item>
            <List.Item>Your payment will be transferred to Safe Vault</List.Item>
            <List.Item>The order will be saved in our FireStore DB</List.Item>
            <List.Item>You will receive success notifications</List.Item>
            <List.Item>Shopping cart will be reset</List.Item>
        </List>
    </>
}

export default ConfirmationDialogContent;
