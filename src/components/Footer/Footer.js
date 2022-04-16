import s from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={s.footer}>
      <p className={s.text}>
        Created by{' '}
        <a
          className={s.link}
          href="https://github.com/Roman-Lahoda"
          target="_blank"
          rel="noopener noreferer"
        >
          LaRI 👨‍💻
        </a>
      </p>
    </div>
  );
};
export default Footer;
