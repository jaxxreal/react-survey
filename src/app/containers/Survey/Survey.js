import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
// import _bindAll from 'lodash/bindAll';
// import ReactSwipe from 'react-swipe';
import TouchSelect from '../../components/TouchSelect';

import Icon from '../../components/Icon';

const iconSize = {
    height: 40,
    width: 40,
};

export class Survey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIdx: 0
        };
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
        return (
            <div className="survey" style={ { backgroundColor } }>
                <h1 className="survey__question">{ question }</h1>
                <div className="drops">
                    { statement.map((str) => (
                        <div
                            key={ str }
                            className={ cx('drops__item', { drops__item_checked: false }) }
                        />
                    )) }
                </div>
                <TouchSelect
                    onAnswer={ answer => console.log(answer) }
                    question={ statement[0] }
                    options={ [yeslabel, nolabel, notsurelabel] }
                />
                <div className="survey__footer">
                    <div className="survey__footer-item">
                        <button className="btn">
                            <Icon glyph="speech-bubble" { ...iconSize }/>
                        </button>
                    </div>
                    <div className="survey__footer-item">
                        <button className="btn">
                            <Icon glyph="muted" { ...iconSize }/>
                        </button>
                    </div>
                    <div className="survey__footer-item">
                        <button className="btn">
                            <Icon glyph="right-arrow-circle" { ...iconSize }/>
                        </button>
                    </div>
                </div>
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
