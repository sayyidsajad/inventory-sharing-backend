<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


# Fire Department Inventory Management System
## Conceptual Data Model

### Core Entities

1. **Inventory**
   - Primary Entity: Equipment and supplies used by fire departments
   - **Primary Key**: equipId
   - **Required Attributes**: name, type, category, status
   - **Optional Attributes**: description, skuMpn, modelNumber, serialNumber, sensors, depreciation data
   - **Financial Attributes**: purchasePrice, acquisitionDate, insuranceCoverage, warrantyExpiryDate
   - **Maintenance Attributes**: schedule, lastMaintenanceDate, nextMaintenanceDate

2. **Location**
   - Hierarchical storage location information
   - **Primary Key**: _id
   - **Required Attributes**: siteStationName
   - **Optional Attributes**: roomFireTruck, aisle, rack, shelfLevel, bin
   - Represents both buildings and vehicles

3. **Manufacturer**
   - Companies that produce equipment
   - **Primary Key**: _id
   - **Required Attributes**: name
   - **Optional Attributes**: contactEmail, phoneNumber

4. **Supplier**
   - Businesses that sell equipment
   - **Primary Key**: _id
   - **Required Attributes**: name
   - **Optional Attributes**: address, contactPerson, phoneNumber

5. **User**
   - System users who manage inventory
   - **Primary Key**: _id
   - **Required Attributes**: name, email
   - **Optional Attributes**: role (admin/user), organization

6. **InventorySharing**
   - Mechanism for sharing inventory between users/departments
   - **Primary Key**: _id
   - **Required Attributes**: sharedBy, sharedWith, status
   - **Optional Attributes**: organizationName, address, subject, emailBody, approvedBy, approvedOn, message

### Key Relationships

- **Inventory → Manufacturer**: Many-to-One (Required)
  - Each inventory item is produced by exactly one manufacturer

- **Inventory → Supplier**: Many-to-One (Optional)
  - Each inventory item may be supplied by one supplier

- **Inventory → Location**: Many-to-One (Required)
  - Each inventory item is stored at exactly one location

- **Inventory → Inventory**: Many-to-Many (Self-relationship)
  - Inventory items can be associated with other inventory items
  - Implements through associatedItems array reference

- **User → InventorySharing → User**: Many-to-Many
  - Users can share inventory information with other users
  - Implements through the InventorySharing entity

### Business Rules

1. Equipment IDs (equipId) must be unique across all inventory
2. Tag IDs (tagId) must be unique when provided
3. Inventory status is restricted to: Available, Out of Stock, Under Maintenance
4. Inventory sharing requires a request/approval workflow
5. All entities track creation and update timestamps
6. Depreciation calculations follow standard financial rules

### System Purpose

This system provides comprehensive management of fire department equipment, including:
- Asset tracking across multiple locations
- Maintenance scheduling and history
- Depreciation and financial management
- Inter-department equipment sharing
- Detailed equipment specifications and documentation


<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 700">
  <!-- Background -->
  <rect width="900" height="700" fill="#f8f9fa" />
  
  <!-- Title -->
  <text x="450" y="40" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle" fill="#333">Fire Department Inventory Management System</text>
  <text x="450" y="70" font-family="Arial" font-size="16" text-anchor="middle" fill="#666">Conceptual Data Model</text>
  
  <!-- Entity: Inventory (Central) -->
  <rect x="330" y="250" width="240" height="200" rx="5" ry="5" fill="#b3e0ff" stroke="#0066cc" stroke-width="2" />
  <text x="450" y="275" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Inventory</text>
  <line x1="350" y1="285" x2="550" y2="285" stroke="#0066cc" stroke-width="1" />
  <text x="340" y="305" font-family="Arial" font-size="14" fill="#333">• equipId (PK)</text>
  <text x="340" y="325" font-family="Arial" font-size="14" fill="#333">• name</text>
  <text x="340" y="345" font-family="Arial" font-size="14" fill="#333">• type, category</text>
  <text x="340" y="365" font-family="Arial" font-size="14" fill="#333">• status</text>
  <text x="340" y="385" font-family="Arial" font-size="14" fill="#333">• purchasePrice</text>
  <text x="340" y="405" font-family="Arial" font-size="14" fill="#333">• sensors (1-4)</text>
  <text x="340" y="425" font-family="Arial" font-size="14" fill="#333">• maintenance details</text>
  <text x="340" y="445" font-family="Arial" font-size="14" fill="#333">• depreciation data</text>
  
  <!-- Entity: Location -->
  <rect x="650" y="200" width="200" height="140" rx="5" ry="5" fill="#d1e7dd" stroke="#198754" stroke-width="2" />
  <text x="750" y="225" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Location</text>
  <line x1="670" y1="235" x2="830" y2="235" stroke="#198754" stroke-width="1" />
  <text x="660" y="255" font-family="Arial" font-size="14" fill="#333">• _id (PK)</text>
  <text x="660" y="275" font-family="Arial" font-size="14" fill="#333">• siteStationName</text>
  <text x="660" y="295" font-family="Arial" font-size="14" fill="#333">• roomFireTruck</text>
  <text x="660" y="315" font-family="Arial" font-size="14" fill="#333">• aisle, rack</text>
  <text x="660" y="335" font-family="Arial" font-size="14" fill="#333">• shelfLevel, bin</text>
  
  <!-- Entity: Manufacturer -->
  <rect x="100" y="150" width="180" height="120" rx="5" ry="5" fill="#f8d7da" stroke="#dc3545" stroke-width="2" />
  <text x="190" y="175" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Manufacturer</text>
  <line x1="120" y1="185" x2="260" y2="185" stroke="#dc3545" stroke-width="1" />
  <text x="110" y="205" font-family="Arial" font-size="14" fill="#333">• _id (PK)</text>
  <text x="110" y="225" font-family="Arial" font-size="14" fill="#333">• name</text>
  <text x="110" y="245" font-family="Arial" font-size="14" fill="#333">• contactEmail</text>
  <text x="110" y="265" font-family="Arial" font-size="14" fill="#333">• phoneNumber</text>
  
  <!-- Entity: Supplier -->
  <rect x="100" y="350" width="180" height="140" rx="5" ry="5" fill="#fff3cd" stroke="#ffc107" stroke-width="2" />
  <text x="190" y="375" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Supplier</text>
  <line x1="120" y1="385" x2="260" y2="385" stroke="#ffc107" stroke-width="1" />
  <text x="110" y="405" font-family="Arial" font-size="14" fill="#333">• _id (PK)</text>
  <text x="110" y="425" font-family="Arial" font-size="14" fill="#333">• name</text>
  <text x="110" y="445" font-family="Arial" font-size="14" fill="#333">• address</text>
  <text x="110" y="465" font-family="Arial" font-size="14" fill="#333">• contactPerson</text>
  <text x="110" y="485" font-family="Arial" font-size="14" fill="#333">• phoneNumber</text>
  
  <!-- Entity: User -->
  <rect x="400" y="500" width="180" height="120" rx="5" ry="5" fill="#cff4fc" stroke="#0dcaf0" stroke-width="2" />
  <text x="490" y="525" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">User</text>
  <line x1="420" y1="535" x2="560" y2="535" stroke="#0dcaf0" stroke-width="1" />
  <text x="410" y="555" font-family="Arial" font-size="14" fill="#333">• _id (PK)</text>
  <text x="410" y="575" font-family="Arial" font-size="14" fill="#333">• name</text>
  <text x="410" y="595" font-family="Arial" font-size="14" fill="#333">• email</text>
  <text x="410" y="615" font-family="Arial" font-size="14" fill="#333">• role</text>
  
  <!-- Entity: InventorySharing -->
  <rect x="650" y="400" width="200" height="160" rx="5" ry="5" fill="#e2d9f3" stroke="#6f42c1" stroke-width="2" />
  <text x="750" y="425" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">InventorySharing</text>
  <line x1="670" y1="435" x2="830" y2="435" stroke="#6f42c1" stroke-width="1" />
  <text x="660" y="455" font-family="Arial" font-size="14" fill="#333">• _id (PK)</text>
  <text x="660" y="475" font-family="Arial" font-size="14" fill="#333">• sharedBy (FK)</text>
  <text x="660" y="495" font-family="Arial" font-size="14" fill="#333">• sharedWith (FK)</text>
  <text x="660" y="515" font-family="Arial" font-size="14" fill="#333">• status</text>
  <text x="660" y="535" font-family="Arial" font-size="14" fill="#333">• organizationName</text>
  <text x="660" y="555" font-family="Arial" font-size="14" fill="#333">• approvedOn</text>
  
  <!-- Relationship: Inventory to Manufacturer -->
  <line x1="330" y1="300" x2="280" y2="200" stroke="#333" stroke-width="2" />
  <text x="290" y="240" font-family="Arial" font-size="14" font-style="italic" fill="#333">manufactured by</text>
  <text x="290" y="258" font-family="Arial" font-size="12" fill="#666">1</text>
  <text x="320" y="290" font-family="Arial" font-size="12" fill="#666">*</text>
  
  <!-- Relationship: Inventory to Supplier -->
  <line x1="330" y1="350" x2="280" y2="400" stroke="#333" stroke-width="2" />
  <text x="285" y="380" font-family="Arial" font-size="14" font-style="italic" fill="#333">supplied by</text>
  <text x="290" y="398" font-family="Arial" font-size="12" fill="#666">1</text>
  <text x="320" y="350" font-family="Arial" font-size="12" fill="#666">*</text>
  
  <!-- Relationship: Inventory to Location -->
  <line x1="570" y1="300" x2="650" y2="260" stroke="#333" stroke-width="2" />
  <text x="600" y="270" font-family="Arial" font-size="14" font-style="italic" fill="#333">stored at</text>
  <text x="635" y="260" font-family="Arial" font-size="12" fill="#666">1</text>
  <text x="580" y="290" font-family="Arial" font-size="12" fill="#666">*</text>
  
  <!-- Relationship: User to InventorySharing (sharedBy) -->
  <line x1="580" y1="540" x2="650" y2="500" stroke="#333" stroke-width="2" />
  <text x="600" y="510" font-family="Arial" font-size="14" font-style="italic" fill="#333">shares</text>
  <text x="585" y="535" font-family="Arial" font-size="12" fill="#666">1</text>
  <text x="640" y="505" font-family="Arial" font-size="12" fill="#666">*</text>
  
  <!-- Relationship: User to InventorySharing (sharedWith) -->
  <line x1="580" y1="560" x2="650" y2="520" stroke="#333" stroke-width="2" stroke-dasharray="5,5" />
  <text x="615" y="545" font-family="Arial" font-size="14" font-style="italic" fill="#333">receives</text>
  <text x="585" y="565" font-family="Arial" font-size="12" fill="#666">1</text>
  <text x="640" y="525" font-family="Arial" font-size="12" fill="#666">*</text>
  
  <!-- Self-relationship: Inventory to Inventory -->
  <path d="M 450 250 C 450 220, 600 220, 600 240" stroke="#333" stroke-width="2" fill="none" />
  <path d="M 600 240 L 590 230 L 600 240 L 590 250 Z" fill="#333" />
  <text x="500" y="220" font-family="Arial" font-size="14" font-style="italic" fill="#333">associated with</text>
  <text x="450" y="240" font-family="Arial" font-size="12" fill="#666">*</text>
  <text x="590" y="240" font-family="Arial" font-size="12" fill="#666">*</text>
  
  <!-- Legend -->
  <rect x="650" y="600" width="200" height="80" rx="5" ry="5" fill="white" stroke="#333" stroke-width="1" />
  <text x="750" y="620" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Legend</text>
  <line x1="670" y1="635" x2="830" y2="635" stroke="#333" stroke-width="1" />
  <line x1="670" y1="650" x2="700" y2="650" stroke="#333" stroke-width="2" />
  <text x="705" y="655" font-family="Arial" font-size="14" fill="#333">Required relation</text>
  <line x1="670" y1="670" x2="700" y2="670" stroke="#333" stroke-width="2" stroke-dasharray="5,5" />
  <text x="705" y="675" font-family="Arial" font-size="14" fill="#333">Optional relation</text>
</svg>