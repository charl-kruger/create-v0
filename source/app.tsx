import React from 'react';
import { Text } from 'ink';

interface Props {
	name: string;
	targetDir: string;
}

export default function App({ name }: Props) {
	return (
		<Text>
			Hello, <Text color="green">{name}</Text>
		</Text>
	);
}
