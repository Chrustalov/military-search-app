# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_05_11_174706) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "broadcasts", force: :cascade do |t|
    t.boolean "is_telegram", default: false
    t.boolean "is_email", default: false
    t.boolean "only_my_city", default: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_broadcasts_on_user_id"
  end

  create_table "cities", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.text "text"
    t.bigint "user_id", null: false
    t.bigint "post_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_comments_on_post_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "missing_people", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "avatar"
    t.date "birthdate"
    t.string "region"
    t.text "information"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "post_id", null: false
    t.index ["post_id"], name: "index_missing_people_on_post_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.integer "status"
    t.text "content"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "photo"
    t.bigint "city_id"
    t.index ["city_id"], name: "index_posts_on_city_id"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "city_id"
    t.string "first_phone"
    t.string "second_phone"
    t.text "about_me"
    t.string "telegram_link"
    t.string "instagram_link"
    t.string "facebook_link"
    t.string "first_name"
    t.string "second_name"
    t.string "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "organization_name"
    t.index ["city_id"], name: "index_profiles_on_city_id"
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.integer "role", default: 0
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "broadcasts", "users"
  add_foreign_key "comments", "posts"
  add_foreign_key "comments", "users"
  add_foreign_key "missing_people", "posts"
  add_foreign_key "posts", "cities"
  add_foreign_key "posts", "users"
  add_foreign_key "profiles", "cities"
  add_foreign_key "profiles", "users"
end
