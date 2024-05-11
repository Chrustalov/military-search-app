class VolunteerMailer < ApplicationMailer
    default from: 'volunteer@gmail.com'
  
    def job_email
      @post = params[:post]
      @city = @post.city
      @user = params[:user]
      @url  = ' https://military-app-search.netlify.app/posts/'
      #змінити на сервері
      mail(to: @user.email, subject: 'We have anoucment for you')
    # винести в контроллер

      # Користувачі, для яких broadcast.only_my_city === false та city == @city
    #     users_false_city = User.joins(:broadcast).where(broadcast: { only_my_city: false })


    # # Користувачі, для яких broadcast.only_my_city == true та city == @city
    #     users_true_city = User.joins(:broadcast).where(broadcast: { only_my_city: true }).joins(:profile).where(profile: {city: @city})

    # # Об'єднання масивів користувачів
    #     @users = users_false_city + users_true_city
    #     @users = @users.joins(:broadcast).where(broadcast: { is_email: true })
      
    end
  end