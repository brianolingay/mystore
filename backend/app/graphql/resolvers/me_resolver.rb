module Resolvers
  class MeResolver < Resolvers::BaseResolver
    type Types::UserType, null: false

    def resolve
      user = context[:current_resource]

      { id: user.id, email: user.email }
    end
  end
end
