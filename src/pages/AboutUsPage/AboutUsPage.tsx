import React from 'react';

import adressIcon from './img/adress.svg';
import mailIcon from './img/mail.svg';
import phoneIcon from './img/phone.svg';
import qiwiIcon from './img/qiwi.svg';
import sbpIcon from './img/sbp.svg';
import donationAlertsIcon from './img/donationAlerts.svg';

import teamImg from './img/team.jpg';
import contactImg from './img/contact.png';
import donateImg from './img/donate.png';

import { Footer } from '@/components';

import style from './AboutUsPage.module.css';

export const AboutUsPage = () => {
  return (
    <div className={style.container}>
      <div className={style.title_container}>
        <div className={style.title}>О нас</div>
        <div className={style.navbar}>главная / о нас</div>
      </div>
      <div className={style.about_container}>
        <div className={style.img_container}>
          <img src={teamImg} alt="teamImg" className={style.team_img} />
          <div className={style.tint} />
        </div>
        <div className={style.team_container}>
          <div className={style.title}>наша команда специалистов</div>
          <div className={style.main_text}>
            <p>
              Мы команда энтузиастов, которые любят путешествовать и открывать новые места. Наша
              миссия - сделать путешествия более увлекательными и запоминающимися, позволяя людям
              находить и делиться интересными местами со всего мира.
            </p>
            <p>
              Мы создали этот сайт, чтобы помочь пользователям добавлять свои любимые места, которые
              они посетили или хотели бы посетить. У нас есть простой интерфейс, который позволяет
              легко добавлять достопримечательности, загружать фотографии и описывать их
              особенности.
            </p>
            Мы стремимся создать сообщество людей, которые разделяют нашу страсть к путешествиям и
            желанию открывать новые места. Мы надеемся, что наш сайт станет вашим надежным
            помощником в путешествиях и поможет вам найти лучшие места для посещения.
          </div>
        </div>
      </div>
      <div className={style.visit_cards_container}>
        <div className={style.contact_container}>
          <img src={contactImg} alt="contactImg" className={style.contact_img} />
          <div className={style.visit_card}>
            <div className={style.title}>НАШИ КОНТАКТЫ</div>
            <div className={style.contacts}>
              <div className={style.mail_container}>
                <img src={mailIcon} alt="mailIcon" />
                <span>info@mysite.com</span>
              </div>

              <div className={style.phone_container}>
                <img src={phoneIcon} alt="phoneIcon" />
                <span>+1 123-456-7890</span>
              </div>
            </div>
            <div className={style.adress_container}>
              <img src={adressIcon} alt="adressIcon" />
              <span>123 Main St, Anytown USA</span>
            </div>
          </div>
        </div>

        <div className={style.donate_container}>
          <div className={style.donate_card}>
            <div className={style.title}>поблагодарить команду разработчиков</div>
            <div className={style.icon_container}>
              <img src={qiwiIcon} alt="qiwiIcon" />
              <img src={sbpIcon} alt="sbpIcon" />
              <img src={donationAlertsIcon} alt="donationAlertsIcon" />
            </div>
          </div>
          <img src={donateImg} alt="contactImg" className={style.donate_img} />
        </div>
      </div>

      <Footer />
    </div>
  );
};
