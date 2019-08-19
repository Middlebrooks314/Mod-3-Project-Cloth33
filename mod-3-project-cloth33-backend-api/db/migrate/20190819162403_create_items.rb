class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :name
      t.string :category
      t.references :user, foreign_key: true
      t.string :img_url

      t.timestamps
    end
  end
end
