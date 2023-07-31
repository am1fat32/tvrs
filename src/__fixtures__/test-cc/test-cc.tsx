import React from 'react';

import * as s from './test-cc.pcss';

export interface TestCcProps {}

interface TestCcState {}

export class TestCc extends React.PureComponent<TestCcProps, TestCcState> {
	public constructor(props: TestCcProps) {
		super(props);
		this.state = {};
	}

	public render(): JSX.Element {
		const {} = this.props;
		const {} = this.state;

		return (
			<div>test-cc</div>
		);
	}
}
