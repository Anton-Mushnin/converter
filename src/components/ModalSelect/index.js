/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './ModalSelect.module.css';

function ModalSelect({ symbols, onChange, value }) {
  const [show, setShow] = useState(false);
  const tickers = useSelector((state) => state.symbols.tickers);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clickHandler = (ticker) => () => {
    onChange(ticker);
    setShow(false);
  };

  const ref = React.createRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        block: 'center',
      });
    }
  }, [ref]);

  return (
    <>
      {/* <button className={styles.button} type="button" onClick={handleShow} /> */}
      <img
        className={styles.button}
        src="/images/choose.png"
        onClick={handleShow}
        alt="choose"
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <ListGroup variant="flush">
            { tickers.map((ticker) => (
              <ListGroup.Item
                ref={ticker === value ? ref : null}
                key={ticker}
                onClick={clickHandler(ticker)}
              >
                <div className={ticker === value ? styles.active : styles.row}>
                  <div className={styles.ticker}>{ticker}</div>
                  <br />
                  <div className={styles.currency}>{symbols[ticker]}</div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalSelect;
