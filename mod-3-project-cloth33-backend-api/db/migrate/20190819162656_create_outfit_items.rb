class CreateOutfitItems < ActiveRecord::Migration[5.2]
  def change
    create_table :outfit_items do |t|
      t.references :item, foreign_key: true
      t.references :outfit, foreign_key: true

      t.timestamps
    end
  end
end
