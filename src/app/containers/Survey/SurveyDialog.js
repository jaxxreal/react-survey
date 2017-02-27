import React, { Component, PropTypes } from 'react';
import _bindAll from 'lodash/bindAll';

import Dialog from '../../components/Dialog';

export default class SurveyDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: '',
        };
        _bindAll(this, ['onAnswerChange', 'submitAnswer']);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen && this.textarea) {
            this.textarea.focus();
        }
    }

    onAnswerChange({ target: { value } }) {
        this.setState({ answer: value });
    }

    submitAnswer() {
        const answer = this.state.answer.trim();
        if (answer.length > 0) {
            this.props.submitAnswer(answer);
            this.props.close();
            this.setState({ answer: '' });
        }
    }

    render() {
        return (
            <Dialog title="Your own answer" isOpen={ this.props.isOpen }>
                <div className="survey-dialog">
                    <textarea
                        rows="20"
                        ref={ r => (this.textarea = r) }
                        className="survey-dialog__textarea"
                        onChange={ this.onAnswerChange }
                        value={ this.state.answer }
                        name="survey-answer"
                    />
                    <div className="survey-dialog__footer">
                        <button
                            className="btn btn_outlined btn_rounded btn_padded"
                            onClick={ this.props.close }
                        >
                            <span className="btn__content">&times;</span>
                        </button>
                        <button
                            onClick={ this.submitAnswer }
                            className="btn btn_outlined btn_rounded btn_padded"
                        >
                            <span className="btn__content">Answer</span>
                        </button>
                    </div>
                </div>
            </Dialog>
        );
    }
}

SurveyDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    submitAnswer: PropTypes.func.isRequired,
};
