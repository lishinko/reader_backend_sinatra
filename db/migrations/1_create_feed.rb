Sequel.migration do
  up do
    create_table(:feeds) do
      primary_key :id
      String :link, null: false
    end
    create_table(:articles) do
      primary_key :id
      String :title, null: false
      String :summary
      #don't know how to represent time. fortunately it's not important
      #String :time
  end

  down do
    drop_table(:feeds)
    drop_table(:articles)
  end
end
