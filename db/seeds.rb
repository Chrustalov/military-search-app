# seeds.rb

# Створюємо деякі міста
City.create(name: 'Київ')
City.create(name: 'Львів')
City.create(name: 'Одеса')

user1 = User.create(email: "test@gmail.com",
                    role: 1,
                    password: '123456Ua',
                    password_confirmation: '123456Ua')

Profile.create(user_id: user1.id, city_id: City.first.id, organization_name: 'DNS', avatar: File.open('app/assets/avatar-und.png'), about_me: 'We are good org.')
# Profile.create(user_id: user1.id, city_id: City.second.id, first_name: 'Марія', second_name: 'Сидорова', avatar: File.open('app/assets/avatar-und.png'), about_me: 'Привіт! Я Марія.')

# Створюємо пости
post1 = Post.create(title: 'Перший пост', content: 'Вітання з першим постом!', user_id: user1.id, photo: File.open('app/assets/post.png'))
post2 = Post.create(title: 'Другий пост', content: 'Привіт від другого користувача!', user_id: user1.id, photo: File.open('app/assets/post.png'))
# Додамо файли зображень

# Створюємо коментарі
Comment.create(text: 'Це чудово!', user_id: user1.id, post_id: post1.id)
Comment.create(text: 'Дякую за пост!', user_id: user1.id, post_id: post2.id)

# Створюємо оголошення
Broadcast.create(user_id: user1.id, is_telegram: true, is_email: false, only_my_city: true)

# Створюємо записи про зниклих людей
MissingPerson.create(first_name: 'Іван', last_name: 'Сидоров', city_id: City.first.id, information: 'Пропав безвісти.', post_id: post1.id, avatar: File.open('app/assets/avatar-und.png'))
MissingPerson.create(first_name: 'Марія', last_name: 'Іванова', city_id: City.second.id, information: 'Шукаємо допомоги у пошуку.', post_id: post2.id, avatar: File.open('app/assets/avatar-und.png'))
