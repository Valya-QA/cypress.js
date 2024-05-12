
import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); //зашла на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
          });//проверяю цвет кнопки

          afterEach('Конец теста', function () {
            cy.get('#exitMessageButton > .exitIcon').should('be.visible');
           });

    it('1. Верный логин и верный пароль', function () {

         cy.get(main_page.email).type(data.login);// ввела верный логин
         cy.get(main_page.password).type(data.password);// ввела верный пароль
         cy.get(main_page.login_button).click(); // нашла кнопку войти и нажала на нее
         
         cy.get(result_page.title).contains('Авторизация прошла успешно');//проверяю что после авторизации есть текст
         cy.get(result_page.title).should('be.visible');//текст авторизации виден пользователю
        
        })

        it('2. Проверка восстановления пароля ', function () {

            cy.get(main_page.fogot_pass_btn).click(); // нажала восстановить пароль
            cy.get(recovery_password_page.email).type(data.login);//ввела почту для восстановления
            cy.get(recovery_password_page.send_button).click();// нажала отправить код
           
            cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');//проверяю на совпадение текст
            cy.get(result_page.title).should('be.visible');//текст виден пользователю
            
           }) 
           it('3. Верный логин и неверный пароль', function () {

            cy.get(main_page.email).type(data.login);// ввела верный логин
            cy.get(main_page.password).type('iLoveqastudio7');// ввела неверный пароль
            cy.get(main_page.login_button).click(); // нашла кнопку войти и нажала на нее
           
            cy.get(result_page.title).contains('Такого логина или пароля нет');//проверяю что после авторизации есть текст
            cy.get(result_page.title).should('be.visible');//текст авторизации виден пользователю
            
        })
        it('4. Неверный логин и верный пароль ', function () {
            
            cy.get(main_page.email).type('valya@yandex.ru');// ввела неверный логин
            cy.get(main_page.password).type(data.password);// ввела верный пароль
            cy.get(main_page.login_button).click(); // нашла кнопку войти и нажала на нее
            cy.get(result_page.title).contains('Такого логина или пароля нет');//проверяю что после авторизации есть текст
            cy.get(result_page.title).should('be.visible');//текст авторизации виден пользователю
            
        })

           it('5. Проверка что в логине есть @', function () {
           
            cy.get(main_page.email).type('germandolnikov.ru');// ввела  логин без @
            cy.get(main_page.password).type(data.password);// ввела верный пароль
            cy.get(main_page.login_button).click(); // нашла кнопку войти и нажала на нее
           
            cy.get(result_page.title).contains('Нужно исправить проблему валидации');//проверяю что после авторизации есть текст
            cy.get(result_page.title).should('be.visible');//текст авторизации виден пользователю
            
           })
           it('6. Проверка на строчные буквы', function () {
            
            cy.get(main_page.email).type('GerMan@Dolnikov.ru');// ввела логин строчными и прописными буквами
            cy.get(main_page.password).type(data.password);// ввела верный пароль
            cy.get(main_page.login_button).click(); // нашла кнопку войти и нажала на нее
           
            cy.get(result_page.title).contains('Авторизация прошла успешно');//проверяю что после авторизации есть текст
            cy.get(result_page.title).should('be.visible');//текст авторизации виден пользователю
            
           })
           
    }) 
