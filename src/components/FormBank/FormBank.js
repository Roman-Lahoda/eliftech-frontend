import { useState } from 'react';
import { createBank, updateBank } from '../../service/bank';
import s from './FormBank.module.scss';

const FormBank = ({ onToggle, setBanks, selectedBank }) => {
  const [bankName, setBankName] = useState(selectedBank?.bankName || '');
  const [interestRate, setInterestRate] = useState(selectedBank?.interestRate || '');
  const [maximumLoan, setMaximumLoan] = useState(selectedBank?.maximumLoan || '');
  const [minimumDownPayment, setMinimumDownPayment] = useState(
    selectedBank?.minimumDownPayment || '',
  );
  const [loanTerm, setLoanTerm] = useState(selectedBank?.loanTerm || '');

  const handleChange = e => {
    const value = e.target.value;
    switch (e.target.id) {
      case 'bankName':
        setBankName(value);
        break;
      case 'interestRate':
        setInterestRate(value);
        break;
      case 'maximumLoan':
        setMaximumLoan(value);
        break;
      case 'minimumDownPayment':
        setMinimumDownPayment(value);
        break;
      case 'loanTerm':
        setLoanTerm(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newBank = { bankName, interestRate, maximumLoan, minimumDownPayment, loanTerm };
    if (selectedBank) {
      updateBank({ ...selectedBank, ...newBank }).then(data => {
        const listBanks = JSON.parse(localStorage.getItem('banks'));
        const newListBanks = listBanks.map(el => {
          if (el._id === data._id) {
            return data;
          }
          return el;
        });
        localStorage.setItem('banks', JSON.stringify(newListBanks));
        if (data) {
          setBanks(prev => [
            ...prev.map(bank => {
              if (bank._id === data._id) {
                return data;
              }
              return bank;
            }),
          ]);
        }
      });
    } else {
      createBank(newBank).then(data => {
        if (data) {
          setBanks(prev => [...prev, data]);
        }
      });
    }
    setBankName('');
    setInterestRate('');
    setMaximumLoan('');
    setMinimumDownPayment('');
    setLoanTerm('');
  };

  return (
    <div className={s.box}>
      <button
        className={s.btn_close}
        onClick={() => {
          onToggle();
        }}
      >
        X
      </button>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <div className={s.form_item}>
          <label htmlFor="bankName">Name</label>
          <input
            autoComplete="off"
            className={s.input}
            type="text"
            id="bankName"
            value={bankName}
          />
        </div>
        <div className={s.form_item}>
          <label htmlFor="interestRate"> Interest rate </label>
          <input
            autoComplete="off"
            className={s.input}
            type="number"
            id="interestRate"
            value={interestRate}
          />
        </div>
        <div className={s.form_item}>
          <label htmlFor="maximumLoan">Maximum loan</label>
          <input
            autoComplete="off"
            className={s.input}
            type="number"
            id="maximumLoan"
            value={maximumLoan}
          />
        </div>
        <div className={s.form_item}>
          <label htmlFor="minimumDownPayment">Minimum down payment </label>
          <input
            autoComplete="off"
            className={s.input}
            type="number"
            id="minimumDownPayment"
            value={minimumDownPayment}
          />
        </div>
        <div className={s.form_item}>
          <label htmlFor="loanTerm">Loan term</label>
          <input
            autoComplete="off"
            className={s.input}
            type="number"
            id="loanTerm"
            value={loanTerm}
          />
        </div>
        <button
          className={s.btn_submit}
          onClick={e => {
            handleSubmit(e);
          }}
        >
          {selectedBank ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default FormBank;
