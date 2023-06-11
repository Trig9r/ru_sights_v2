import adressIcon from './img/adress.svg';
import mailIcon from './img/mail.svg';
import phoneIcon from './img/phone.svg';
import qiwiIcon from './img/qiwi.svg';
import sbpIcon from './img/sbp.svg';
import donationAlertsIcon from './img/donationAlerts.svg';

import kolaj_sights from './img/kolaj_sights.png';
import contactImg from './img/contact.png';
import donateImg from './img/donate.png';

import { Footer } from '@/components';

import style from './AboutUsPage.module.css';

export const AboutUsPage = () => {
  return (
    <div className={style.container}>
      <div className={style.title_container}>
        <div className={style.title}>Поддержка и благодарность</div>
        <div className={style.navbar}>главная / о сайте</div>
      </div>

      <div className={style.about_container}>
        <div className={style.img_container}>
          <img src={kolaj_sights} alt="kolaj_sights" className={style.team_img} />
          <div className={style.tint} />
        </div>

        <div className={style.team_container}>
          <div className={style.title}>наша команда специалистов</div>

          <div className={style.main_text}>
            <p>
              Разработчик этого ресурса любит путешествовать и открывать новые места. Его миссия -
              сделать путешествия более увлекательными и запоминающимися, позволяя людям находить и
              делиться интересными местами со всего мира.
            </p>
            <p>
              Сайт создан, чтобы помочь пользователям добавлять свои любимые места, которые они
              посетили или хотели бы посетить. Сделан простой интерфейс, который позволяет легко
              добавлять достопримечательности, загружать фотографии и описывать их особенности.
            </p>
            Давайте попробуем создать сообщество людей, которые разделяют страсть к путешествиям и
            желанию открывать новые места. Надееюсь, что наш сайт станет вашим надежным помощником в
            путешествиях и поможет вам найти лучшие места для посещения.
          </div>
        </div>
      </div>

      <div className={style.visit_cards_container}>
        <div className={style.contact_container}>
          <img src={contactImg} alt="contactImg" className={style.contact_img} />
          <div className={style.visit_card}>
            <div className={style.title}>КОНТАКТЫ ДЛЯ СВЯЗИ</div>
            <div className={style.contacts}>
              <div className={style.mail_container}>
                <img src={mailIcon} alt="mailIcon" />
                <span>ru-sights@mail.ru</span>
              </div>

              <div className={style.phone_container}>
                <img src={phoneIcon} alt="phoneIcon" />
                <span>+7 921-686-2567</span>
              </div>
            </div>

            <div className={style.adress_container}>
              <img src={adressIcon} alt="adressIcon" />
              <span>Череповец, Вологодская обл.</span>
            </div>
          </div>
        </div>

        <div className={style.donate_container}>
          <div className={style.donate_card}>
            <div className={style.title}>поблагодарить разработчика</div>
            <div className={style.icon_container}>
              <a href="https://qiwi.com/payment/form/99" target="_blank">
                <img src={qiwiIcon} alt="qiwiIcon" />
              </a>
              <img src={sbpIcon} alt="sbpIcon" />
              <a href="https://www.donationalerts.com/r/ru_sights" target="_blank">
                <img src={donationAlertsIcon} alt="donationAlertsIcon" />
              </a>
            </div>
          </div>
          <img src={donateImg} alt="contactImg" className={style.donate_img} />
        </div>
      </div>

      <Footer />
    </div>
  );
};
