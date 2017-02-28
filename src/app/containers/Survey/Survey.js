import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import _bindAll from 'lodash/bindAll';

import TouchSelect from '../../components/TouchSelect';
import Icon from '../../components/Icon';
import SurveyDialog from './SurveyDialog';
import SurveySplash from './SurveySplash';

const iconSize = {
    height: 40,
    width: 40,
};

export class Survey extends Component {

    constructor(props) {
        super(props);
        const questions = props.metadata.statement.slice();
        this.state = {
            answers: [],
            questions,
            isCustomAnswerDialogOpen: false,
            currentQuestion: questions.shift(),
        };
        _bindAll(this, [
            'onToggleAnswerDialog',
            'onSubmitAnswer',
            'onCustomAnswerDialogClose',
            'onRestartSurvey',
            'onSkipQuestion',
        ]);
    }

    onSubmitAnswer(answer) {
        const newAnswer = [this.state.currentQuestion, answer];

        const answers = this.state.answers.slice();
        const questions = this.state.questions.slice();
        answers.push(newAnswer);

        const currentQuestion = questions.shift();

        this.setState({
            questions,
            answers,
            currentQuestion,
        });

        if (!currentQuestion) {
            console.log(answers);
        }
        console.log(newAnswer);
    }

    onCustomAnswerDialogClose() {
        this.setState({ isCustomAnswerDialogOpen: false });
    }

    onToggleAnswerDialog() {
        this.setState({ isCustomAnswerDialogOpen: !this.state.isCustomAnswerDialogOpen });
    }

    onRestartSurvey() {
        const questions = this.props.metadata.statement.slice();
        this.setState({
            answers: [],
            questions,
            currentQuestion: questions.shift(),
        });
    }

    onSkipQuestion() {
        this.onSubmitAnswer('skipped');
    }

    render() {
        const {
            question,
            metadata: {
                backgroundcolor: backgroundColor,
                statement,
                yeslabel,
                nolabel,
                notsurelabel,
            },
        } = this.props;
        const { currentQuestion = '', answers } = this.state;

        return (
            <div className="survey" style={ { backgroundColor } }>
                <h1 className="survey__question">{ question }</h1>
                <div className="progress progress_padded">
                    { statement.map((str, idx) => (
                        <div
                            key={ str }
                            className={ cx('progress__item', { progress__item_checked: !!answers[idx] }) }
                        />
                    )) }
                </div>
                <TouchSelect
                    onAnswer={ this.onSubmitAnswer }
                    question={ currentQuestion }
                    options={ [yeslabel, nolabel, notsurelabel] }
                />
                <div className="survey__footer">
                    <div className="survey__footer-item">
                        <button onClick={ this.onToggleAnswerDialog } className="btn">
                            <Icon glyph="speech-bubble" { ...iconSize }/>
                        </button>
                    </div>
                    <div className="survey__footer-item">
                        <button onClick={ this.onRestartSurvey } className="btn">
                            <Icon glyph="muted" { ...iconSize }/>
                        </button>
                    </div>
                    <div className="survey__footer-item">
                        <button onClick={ this.onSkipQuestion } className="btn">
                            <Icon glyph="right-arrow-circle" { ...iconSize }/>
                        </button>
                    </div>
                </div>
                <SurveySplash
                    isOpen={ currentQuestion.length === 0 }
                    onClick={ this.onRestartSurvey }
                    style={ { backgroundColor } }
                />
                <SurveyDialog
                    close={ this.onCustomAnswerDialogClose }
                    isOpen={ this.state.isCustomAnswerDialogOpen }
                    submitAnswer={ this.onSubmitAnswer }
                />
            </div>
        );
    }

}

Survey.propTypes = {
    question: PropTypes.string.isRequired,
    metadata: PropTypes.shape({
        statement: PropTypes.arrayOf(PropTypes.string).isRequired,
        backgroundcolor: PropTypes.arrayOf(PropTypes.string).isRequired,
        yeslabel: PropTypes.arrayOf(PropTypes.string).isRequired,
        nolabel: PropTypes.arrayOf(PropTypes.string).isRequired,
        notsurelabel: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};
