import {Anchor, Box, Text} from '@mantine/core';
import {FC} from 'react';

const Footer: FC = () => {
  return (
    <Box component="footer" my="md" py="md" sx={{textAlign: 'center'}}>
      <Text>
        Made with &hearts; by <Anchor href="https://github.com/krzysztofsaja">Krzysztof Saja</Anchor>
      </Text>
    </Box>
  );
};

export default Footer;
