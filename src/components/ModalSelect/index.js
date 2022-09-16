/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './ModalSelect.module.css';

function ModalSelect({
  tickers, symbols, onChange, value,
}) {
  const [show, setShow] = useState(false);

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
      <Button variant="primary" onClick={handleShow}>
        select
      </Button>

      <Modal show={show} onHide={handleClose} class="modal fade w-auto">
        <Modal.Body>
          <ListGroup class="list-group list-group-flush w-auto" variant="flush">
            { tickers.map((ticker) => (
              <ListGroup.Item class="list-group-item w-auto" ref={ticker === value ? ref : null} key={ticker} onClick={clickHandler(ticker)}>
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
