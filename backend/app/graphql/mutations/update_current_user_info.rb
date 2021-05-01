module Mutations
  class UpdateCurrentUserInfo < BaseMutation
    field :success, Boolean, null: false
    field :errors, [String], null: true

    argument :name, String, required: true
    argument :nickname, String, required: false

    def resolve(name:, nickname:)
      current_user = context[:current_resource]

      user = User.find(current_user.id)

      user.name = name
      user.nickname = nickname

      { success: false, errors: user.errors.full_message } unless user.save

      { success: true, errors: [] }
    end
  end
end
