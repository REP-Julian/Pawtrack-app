import { execSync } from 'child_process';

const DB_ID = 'pawtrack_db';

function runCmd(cmd) {
    try {
        console.log(`> ${cmd}`);
        const output = execSync(cmd, { stdio: 'pipe', encoding: 'utf-8' });
        return { success: true, output };
    } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : err.message;
        const stdout = err.stdout ? err.stdout.toString() : '';
        const msg = stderr || stdout;
        if (msg.includes('already exists') || msg.includes('Attribute with the same key already exists') || msg.includes('Index with the same key already exists')) {
            console.log(`  ℹ Already exists (skipping)`);
            return { success: true, exists: true };
        }
        console.error(`  ✗ Error: ${msg.trim()}`);
        return { success: false, error: msg };
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function setup() {
    console.log('=== PawTrack Appwrite Automation Setup ===\n');

    // 1. Create Collections
    const collections = [
        { id: 'pets', name: 'pets' },
        { id: 'applications', name: 'applications' },
        { id: 'vet_appointments', name: 'vet_appointments' },
        { id: 'recycle_bin', name: 'recycle_bin' },
        { id: 'activity_logs', name: 'activity_logs' }
    ];

    console.log('--- Step 1: Creating Collections ---');
    for (const col of collections) {
        runCmd(`npx appwrite databases create-collection --database-id ${DB_ID} --collection-id ${col.id} --name ${col.name} --permissions "read(\\"any\\")" --permissions "create(\\"any\\")" --permissions "update(\\"any\\")" --permissions "delete(\\"any\\")" --document-security false --enabled true`);
    }

    // 2. Create Attributes
    console.log('\n--- Step 2: Creating Attributes ---');

    const attributes = {
        pets: [
            { key: 'name', size: 255 },
            { key: 'breed', size: 255 },
            { key: 'gender', size: 50 },
            { key: 'age', size: 50 },
            { key: 'status', size: 50 },
            { key: 'health_status', size: 255 },
            { key: 'owner', size: 255 },
            { key: 'contact_number', size: 50 },
            { key: 'personal_traits', size: 1000 },
            { key: 'reason_for_adoption', size: 1000 },
            { key: 'img', size: 2000 },
            { key: 'type', size: 50 },
            { key: 'weight', size: 50 }
        ],
        applications: [
            { key: 'pet_name', size: 255 },
            { key: 'date', size: 50 },
            { key: 'status', size: 50 },
            { key: 'user_id', size: 255 },
            { key: 'img', size: 2000 }
        ],
        vet_appointments: [
            { key: 'pet_name', size: 255 },
            { key: 'vet_name', size: 255 },
            { key: 'status', size: 50 },
            { key: 'time', size: 50 },
            { key: 'date', size: 50 },
            { key: 'user_id', size: 255 },
            { key: 'img', size: 2000 }
        ],
        recycle_bin: [
            { key: 'name', size: 255 },
            { key: 'breed', size: 255 },
            { key: 'gender', size: 50 },
            { key: 'owner', size: 255 },
            { key: 'img', size: 2000 }
        ],
        activity_logs: [
            { key: 'user_id', size: 255 },
            { key: 'action', size: 255 },
            { key: 'target', size: 255 },
            { key: 'icon', size: 100 },
            { key: 'timestamp', size: 50 }
        ]
    };

    for (const [colId, attrList] of Object.entries(attributes)) {
        console.log(`\nAdding attributes to [${colId}]...`);
        for (const attr of attrList) {
            runCmd(`npx appwrite databases create-string-attribute --database-id ${DB_ID} --collection-id ${colId} --key ${attr.key} --size ${attr.size} --required false`);
        }
    }

    console.log('\n--- Step 3: Waiting for attributes to index/ready in Appwrite (5 seconds) ---');
    await sleep(5000);

    // 3. Create Indexes
    console.log('\n--- Step 4: Creating Indexes ---');
    const indexes = [
        { col: 'pets', key: 'idx_status', attr: 'status' },
        { col: 'pets', key: 'idx_owner', attr: 'owner' },
        { col: 'applications', key: 'idx_user_id', attr: 'user_id' },
        { col: 'applications', key: 'idx_status', attr: 'status' },
        { col: 'vet_appointments', key: 'idx_user_id', attr: 'user_id' },
        { col: 'vet_appointments', key: 'idx_status', attr: 'status' },
        { col: 'recycle_bin', key: 'idx_owner', attr: 'owner' },
        { col: 'activity_logs', key: 'idx_user_id', attr: 'user_id' }
    ];

    for (const idx of indexes) {
        runCmd(`npx appwrite databases create-index --database-id ${DB_ID} --collection-id ${idx.col} --key ${idx.key} --type key --attributes ${idx.attr}`);
    }

    // 4. Ensure Storage Bucket Permissions
    console.log('\n--- Step 5: Verifying Storage Bucket ---');
    runCmd(`npx appwrite storage create-bucket --bucket-id pawtrack_storage --name pawtrack_storage --permissions "read(\\"any\\")" --permissions "create(\\"any\\")" --permissions "update(\\"any\\")" --permissions "delete(\\"any\\")" --enabled true --file-security false`);
    runCmd(`npx appwrite storage update-bucket --bucket-id pawtrack_storage --name pawtrack_storage --permissions "read(\\"any\\")" --permissions "create(\\"any\\")" --permissions "update(\\"any\\")" --permissions "delete(\\"any\\")" --enabled true --file-security false`);

    console.log('\n✅ Setup completed successfully!');
}

setup();
