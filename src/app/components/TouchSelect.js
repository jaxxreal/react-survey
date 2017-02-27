import React, { PropTypes } from 'react';
import _bindAll from 'lodash/bindAll';
import _gte from 'lodash/fp/gte';
import _subtract from 'lodash/fp/subtract';
import _add from 'lodash/fp/add';
import _inRange from 'lodash/fp/inRange';

import TouchSelectOption from '../components/TouchSelectOption';

import { getDocumentSize } from '../utils';

const swipeableSize = {
    width: 120,
    height: 120,
};

const OPTIONS_INDEX = ['noDrop', 'yesDrop', 'notSureDrop'];

export default class TouchSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            isMoving: false,
            screenWidth: getDocumentSize('width'),
            screenHeight: getDocumentSize('height'),
        };
        _bindAll(this, ['onMouseDown', 'onMouseUp', 'onMouseMove', 'answerQuestion', 'selectAnswer']);
    }

    componentWillMount() {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);

        document.addEventListener('touchmove', this.onMouseMove);
        document.addEventListener('touchend', this.onMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);

        document.removeEventListener('touchmove', this.onMouseMove);
        document.removeEventListener('touchend', this.onMouseUp);
    }

    onMouseMove(ev) {
        if (this.state.isMoving) {
            const { shiftX, shiftY, screenHeight, screenWidth } = this.state;
            const { pageX, pageY } = this.getEventCoords(ev);
            const nextX = pageX - shiftX;
            const nextY = pageY - shiftY;
            let x = nextX < 0 ? this.state.x : nextX;
            let y = nextY < 0 ? this.state.y : nextY;

            if (_gte(_add(pageX)(_subtract(swipeableSize.width)(shiftX)))(screenWidth)) {
                x = this.state.x;
            }
            if (_gte(_add(pageY)(_subtract(swipeableSize.height)(shiftY)))(screenHeight)) {
                y = this.state.y;
            }
            this.setState({ x, y });
        }
    }

    onMouseDown(ev) {
        const { pageX, pageY } = this.getEventCoords(ev);
        const { top, left } = this.getCoords(this.swipeable);
        const shiftX = _subtract(pageX);
        const shiftY = _subtract(pageY);
        this.setState({
            isMoving: true,
            shiftX: shiftX(left),
            shiftY: shiftY(top),
            x: _subtract(pageX)(shiftX(left)),
            y: _subtract(pageY)(shiftY(top)),
        });
    }

    onMouseUp(ev) {
        if (this.state.isMoving) {
            const { pageX, pageY } = this.getEventCoords(ev);
            const answerIdx = this.checkDrops({ pageX, pageY });
            if (answerIdx > -1) {
                this.answerQuestion(answerIdx);
            }
            this.setState({ isMoving: false });
        }
    }

    getEventCoords(ev) {
        if (ev.type === 'touchend') {
            const [touch] = ev.changedTouches;
            const { pageX, pageY } = touch;
            return { pageX, pageY };
        }
        if (ev.type === 'touchmove' || ev.type === 'touchstart') {
            const [touch] = ev.touches;
            const { pageX, pageY } = touch;
            return { pageX, pageY };
        }
        const { pageX, pageY } = ev;
        return { pageX, pageY };
    }

    getCoords(elem) {
        const { top, left } = elem.getBoundingClientRect();
        return {
            top: top + pageYOffset,
            left: left + pageXOffset,
        };
    }

    answerQuestion(answerIdx) {
        const [answer] = this.props.options[answerIdx];
        this.props.onAnswer([
            this.props.question,
            answer
        ]);
    }

    selectAnswer(dropType) {
        const answerIdx = OPTIONS_INDEX.indexOf(dropType);
        this.answerQuestion(answerIdx);
    }

    checkDrops({ pageX, pageY }) {
        const result = OPTIONS_INDEX.map(dropType => this.checkDrop({ pageX, pageY }, dropType));
        return result.indexOf(true);
    }

    checkDrop({ pageX, pageY }, dropType) {
        const { left, right, top, bottom } = this[dropType].getBoundingClientRect();
        return _inRange(right)(left)(pageX) && _inRange(bottom)(top)(pageY);
    }

    render() {
        const { question, options: [[nolabel], [yeslabel], [notsurelabel]] } = this.props;
        const { x, y, isMoving } = this.state;
        const { width, height } = swipeableSize;

        return (
            <div className="touch-select">
                <div className="touch-select__row">
                    <TouchSelectOption
                        optionRef={ r => (this.noDrop = r) }
                        label={ nolabel }
                        onSelect={ this.selectAnswer }
                        dropType="noDrop"
                        vertical
                        left
                    />
                    <div
                        ref={ r => (this.swipeable = r) }
                        className="touch-select__swipeable"
                        onMouseDown={ this.onMouseDown }
                        onTouchStart={ this.onMouseDown }
                        style={ { top: y, left: x, width, height, position: isMoving ? 'absolute' : 'static' } }
                    >
                        { question }
                    </div>
                    <TouchSelectOption
                        optionRef={ r => (this.yesDrop = r) }
                        label={ yeslabel }
                        onSelect={ this.selectAnswer }
                        dropType="yesDrop"
                        vertical
                        right
                    />
                </div>
                <TouchSelectOption
                    optionRef={ r => (this.notSureDrop = r) }
                    label={ notsurelabel }
                    onSelect={ this.selectAnswer }
                    dropType="notSureDrop"
                    horizontal
                    bottom
                />
            </div>
        );
    }
}

TouchSelect.propTypes = {
    onAnswer: PropTypes.func,
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired)).isRequired,
};
