class Flat < ApplicationRecord
  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?

  # def structure_address(city, country, zip)
  #   "#{city}, #{country} #{zip}"
  # end
end
