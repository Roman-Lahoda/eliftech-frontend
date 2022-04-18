import { useState, useEffect } from 'react';
import s from './CalculatorPage.module.scss';

const CalculatorPage = () => {
  const banks = JSON.parse(localStorage.getItem('banks')) || [];

  const [initialLoan, setInitialLoan] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [selectBankOpen, setSelectBankOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState();
  const [payment, setPayment] = useState();

  useEffect(() => {
    if (selectedBank) {
      const bank = banks.find(el => el._id === selectedBank);
      const multiplier1 = bank?.interestRate / 12;
      const multiplier2 = Math.pow(1 + bank?.interestRate / 12, bank?.loanTerm);
      const numerator = initialLoan * multiplier1 * multiplier2;
      const denominator = multiplier2 - 1;
      const result = numerator / denominator;
      const payment = Math.round(result * 100) / 100;
      setPayment(payment);
    }
  }, [selectedBank]);

  const handleChange = e => {
    const value = e.target.value;
    switch (e.target.id) {
      case 'initialLoan':
        setInitialLoan(value);
        break;
      case 'downPayment':
        setDownPayment(value);
        break;
      default:
        break;
    }
  };

  const availableBanks = banks
    .filter(el => el?.maximumLoan >= initialLoan)
    ?.filter(el => el?.minimumDownPayment <= downPayment);

  const chooseBank = e => {
    if (availableBanks?.length === 0) {
      return;
    }
    if (e.target.id && e.target.id !== 'selectedBank') {
      e.currentTarget.querySelector('#selectedBank').textContent = e.target.textContent;
      setSelectedBank(e.target.id);
    }
    setSelectBankOpen(prev => !prev);
  };

  return (
    <div className={s.calculator_page}>
      <div className={s.flex}>
        <form onChange={handleChange} className={s.form}>
          <div className={s.item}>
            <label htmlFor="initialLoan">Initial loan</label>
            <input type="text" id="initialLoan" value={initialLoan} />
          </div>
          <div className={s.item}>
            <label htmlFor="downPayment">Down payment</label>
            <input type="text" id="downPayment" value={downPayment} />
          </div>
          <div onClick={chooseBank} className={s.select}>
            <p id="selectedBank">Chose the bank</p>
            <div className={`${s.option} ${selectBankOpen ? s.open : ''}`}>
              {availableBanks?.map(el => {
                return (
                  <p id={el?._id} key={el?._id}>
                    {el?.bankName}
                  </p>
                );
              })}
            </div>
          </div>
        </form>

        {payment ? (
          <div>
            <p className={s.payment}>Monthly mortgage payment: {payment}</p>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CalculatorPage;
