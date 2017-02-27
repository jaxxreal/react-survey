import React, { Component } from 'react';
import Survey from '../containers/Survey';

import dataMock from '../mocks/questions.json';

// rendered once, when app started, never will be unmount
export default class AppWrapper extends Component {

    componentWillMount() {
        console.log('AppWrapper mounted!');
    }

    render() {
        const { metadata, question } = dataMock.questions[1040];
        return (
            <div className="layout layout_centred">
                <div className="main">
                    <Survey
                        question={ question }
                        metadata={ metadata }
                    />
                </div>
            </div>
        );
    }
}
