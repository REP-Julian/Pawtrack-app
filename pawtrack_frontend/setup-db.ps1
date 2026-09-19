appwrite databases create-collection --database-id pawtrack_db --collection-id applications --name applications
appwrite databases create-collection --database-id pawtrack_db --collection-id vet_appointments --name vet_appointments
appwrite databases create-collection --database-id pawtrack_db --collection-id recycle_bin --name recycle_bin

# Pets Attributes
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id pets --key name --size 255 --required true
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id pets --key breed --size 255 --required true
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id pets --key gender --size 50 --required true
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id pets --key age --size 50 --required false
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id pets --key status --size 50 --required true
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id pets --key health_status --size 255 --required false
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id pets --key owner --size 255 --required true
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id pets --key contact_number --size 100 --required false
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id pets --key personal_traits --size 1000 --required false
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id pets --key reason_for_adoption --size 1000 --required false
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id pets --key img --size 1000 --required false

# Applications Attributes
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id applications --key pet_name --size 255 --required true
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id applications --key date --size 100 --required true
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id applications --key status --size 50 --required true
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id applications --key user_id --size 255 --required true
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id applications --key img --size 1000 --required false

# Vet Appointments Attributes
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id vet_appointments --key pet_name --size 255 --required true
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id vet_appointments --key vet_name --size 255 --required true
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id vet_appointments --key status --size 50 --required true
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id vet_appointments --key time --size 100 --required false
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id vet_appointments --key date --size 100 --required false
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id vet_appointments --key user_id --size 255 --required true
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id vet_appointments --key img --size 1000 --required false

# Recycle Bin Attributes
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id recycle_bin --key name --size 255 --required true
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id recycle_bin --key breed --size 255 --required true
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id recycle_bin --key gender --size 50 --required true
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id recycle_bin --key owner --size 255 --required true
appwrite databases create-string-attribute --database-id pawtrack_db --collection-id recycle_bin --key img --size 1000 --required false
