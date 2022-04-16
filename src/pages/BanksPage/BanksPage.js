import { deleteBank, listBanks } from '../../service/bank';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal.js';
import FormBank from '../../components/FormBank/FormBank';
import s from './BanksPage.module.scss';

const BanksPage = () => {
  const [banks, setBanks] = useState(JSON.parse(localStorage.getItem('banks')));
  const [modalShow, setModalShow] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);

  const toggleModal = () => {
    setModalShow(prev => {
      if (prev === true) {
        setSelectedBank(null);
      }
      return !prev;
    });
  };

  useEffect(() => {
    const listFromLS = JSON.parse(localStorage.getItem('banks'));
    if (listFromLS?.length > 0) {
      return;
    }
    listBanks().then(data => {
      if (data) {
        setBanks(data);
      }
    });
  }, []);

  const handleEdit = el => {
    setSelectedBank(el);
    toggleModal();
  };

  const handleDelete = id => {
    deleteBank(id).then(data => {
      if (data) {
        const filterBanks = banks.filter(el => el._id !== id);
        setBanks(filterBanks);
      }
    });
  };

  return (
    <div className={s.banks_page}>
      {banks?.length > 0 ? (
        <>
          <button
            className={s.btn}
            onClick={() => {
              toggleModal();
            }}
          >
            Add bank
          </button>
          <ul className={s.list}>
            {banks.map(el => {
              return (
                <li key={el._id} className={s.list_item}>
                  <div>
                    <p>
                      <span className={s.item}>Name:</span> {el?.bankName}
                    </p>
                    <p>
                      <span className={s.item}>Interest rate:</span> {el?.interestRate}%
                    </p>
                    <p>
                      <span className={s.item}>Maximum loan:</span> {el?.maximumLoan}
                    </p>
                    <p>
                      <span className={s.item}>Minimum down payment:</span> {el?.minimumDownPayment}{' '}
                    </p>
                    <p>
                      <span className={s.item}>Loan term:</span> {el?.loanTerm}{' '}
                    </p>
                  </div>
                  <div className={s.btn_group}>
                    <button
                      className={s.btn}
                      onClick={() => {
                        handleEdit(el);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={s.btn}
                      onClick={() => {
                        handleDelete(el._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <>
          <p>You don’t have banks yet, create one to start</p>
          <button
            className={s.btn_add}
            onClick={() => {
              toggleModal();
            }}
          >
            Add bank
          </button>
        </>
      )}
      {modalShow ? (
        <Modal onToggle={toggleModal}>
          <FormBank onToggle={toggleModal} setBanks={setBanks} selectedBank={selectedBank} />
        </Modal>
      ) : (
        ''
      )}
    </div>
  );
};

export default BanksPage;
