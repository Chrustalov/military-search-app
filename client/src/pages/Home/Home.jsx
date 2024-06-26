import React from "react";
import Feature from "../../components/Home/Feature";
import AdvantageTab from "../../components/Home/AdvantageTab";
import { MdOutlineContactSupport } from "react-icons/md";
import { SiEasyeda } from "react-icons/si";
import { BsChatDots } from "react-icons/bs";
import "../../styles/home.scss";
import {NavLink} from "react-router-dom";

function Home() {
    const features = [
        {
            title: 'Централізована Координація',
            content: "Ми забезпечуємо централізовану платформу, де добровольці, рятувальні служби та організації можуть об'єднати свої зусилля. Це сприяє кращій організації пошукових операцій та ефективнішій координації зусиль.",
            icon: BsChatDots
        },
        {
            title: 'Інформаційна Підтримка',
            content: "Наша платформа надає доступ до важливої інформації про зниклих осіб, включаючи фотографії, описи та останні відомості про їх місцеперебування. Це допомагає зосередити увагу на конкретних пошукових завданнях.",
            icon: MdOutlineContactSupport
        },
        {
            title: 'Гнучкість та Легкість Використання',
            content: "Наша платформа проста у використанні і гнучка. Ви можете легко створювати та керувати пошуковими запитами, спілкуватися з іншими учасниками та отримувати необхідну підтримку.",
            icon: SiEasyeda
        }
    ]
    const tabs = [
        {
            label: "Розсилка для добровольців",
            content: (
                <div>
                    <p>Наша платформа надає можливість отримувати повідомлення про нові ситуації через зручні канали зв'язку, такі як телеграм, електронна пошта та сповіщення по містам.</p>
                    <p>Ви можете налаштувати сповіщення для свого міста або для всіх міст, щоб бути завжди в курсі подій і бути готовими допомогти там, де це потрібно.</p>
                </div>
            ),
        },
        {
            label: "Зручне створення оголошення про зниклих",
            content: (
                <div>
                    <p>Наша платформа пропонує швидке та зручне створення оголошень про зниклих осіб.</p>
                    <p>Завантажуйте дані та інформацію про зниклих швидко та без зайвих зусиль.</p>
                    <p>Ми надаємо простий та інтуїтивно зрозумілий інтерфейс, щоб ви могли оперативно розміщувати інформацію та залучати до пошуку якнайбільше учасників.</p>
                </div>
            ),
        },
        {
            label: "Зручний пошук",
            content: (
                <div>
                    <p>Наша платформа пропонує зручні інструменти для пошуку зниклих осіб.</p>
                    <p>Ви можете шукати за містами, прізвищами або будь-якими іншими параметрами, що полегшує пошук і допомагає зосередитися на конкретних завданнях.</p>
                    <p>Крім того, ми постійно вдосконалюємо наші алгоритми пошуку, щоб забезпечити максимальну ефективність і швидкість у пошуку зниклих осіб.</p>
                </div>
            ),
        },
    ];

    return (
      <main className="container">
        <section className="intro">
          <div className="intro__left">
            <img src="/images/intro.png" alt="Допоможи знайти зниклих" />
          </div>
          <div className="intro__right">
            <h2 className="intro__title">
              Допоможи знайти – разом ми сильніші
            </h2>
            <p className="intro__text">
              Наша платформа є центром об'єднання зусиль людей з усього світу,
              які прагнуть знайти та повернути додому зниклих у зоні військового
              конфлікту. Тут добровольці, рятувальні служби та громадські
              організації знаходяться пліч-о-пліч, щоб забезпечити максимальну
              ефективність пошуку.
            </p>
              <NavLink className="btn btn-outline-success p-2" to={"/posts"}>
                  Переглянути публікації
              </NavLink>
            <div className="help">
                <div className="intro__question">Бажаєте стати добровольцем?</div>
                <NavLink className="btn btn-outline-success p-2" to={"signup"}>
                    Стати добровольцем
                </NavLink>
            </div>
          </div>
        </section>
        <section className="features flex-md-row flex-column text-center">
          {features.map((item) => (
            <Feature key={item.title} {...item} />
          ))}
        </section>
        <section className="advantages">
          <h1 className="advantages__title">Переваги нашої платформи</h1>
          <AdvantageTab tabs={tabs} />
        </section>
      </main>
    );
}

export default Home;
