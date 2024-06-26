# seeds.rb

# Створюємо деякі міста
City.create(name: 'Київ')
City.create(name: 'Львів')
City.create(name: 'Одеса')

user1 = User.create(email: "test@gmail.com",
                    role: 1,
                    password: '123456Ua',
                    password_confirmation: '123456Ua')

Profile.create(
  user_id: user1.id,
  city_id: City.first.id,
  organization_name: 'DNS',
  avatar: File.open('app/assets/avatar-und.png'),
  about_me: 'We are good org.',
  first_phone: '380 11 22 30 333',
  second_phone: '380 66 22 30 333',
  telegram_link: "https://www.google.com/",
  instagram_link: "https://www.google.com/",
  facebook_link: "https://www.google.com/"
  )
# Profile.create(user_id: user1.id, city_id: City.second.id, first_name: 'Марія', second_name: 'Сидорова', avatar: File.open('app/assets/avatar-und.png'), about_me: 'Привіт! Я Марія.')

# Створюємо пости
post1 = Post.create(title: 'Перший пост', city_id: City.first.id, content: 'Вітання з першим постом!', user_id: user1.id, photo: File.open('app/assets/post.png'))
post2 = Post.create(title: 'Другий пост', city_id: City.first.id, content: 'Привіт від другого користувача!', user_id: user1.id, photo: File.open('app/assets/post.png'))
# Додамо файли зображень

# Створюємо коментарі
Comment.create(text: 'Це чудово!', user_id: user1.id, post_id: post1.id)
Comment.create(text: 'Дякую за пост!', user_id: user1.id, post_id: post2.id)

# Створюємо оголошення
Broadcast.create(user_id: user1.id, is_telegram: true, is_email: false, only_my_city: true)

# Створюємо записи про зниклих людей
10.times do
  MissingPerson.create(first_name: 'Іван', region: 'Вул. Вербіне', birthdate: '19 років', last_name: 'Нарденко', information: 'Пропав безвісти.', post_id: post1.id, avatar: File.open('app/assets/avatar-und.png'))
  MissingPerson.create(first_name: 'Марія', region: 'Вул. Вербіне', birthdate: '19 років', last_name: 'Шевчук', information: 'Шукаємо допомоги у пошуку.', post_id: post2.id, avatar: File.open('app/assets/avatar-und.png'))
end
