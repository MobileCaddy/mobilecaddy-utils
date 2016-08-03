### 1.2.0  (2016-08-03)

#### Bug Fixes

* Corrected handling of Dates across timezones
* Correct handling of csStatusCheck failure handling

#### Features

* v0.1.4 of mobilecaddy-utils.min.js
* Added errorLog in upcoming JSON in csStatusCheck calls - for better debugging

#### Breaking Changes

* NONE

### 1.1.1  (2016-01-31)


#### Bug Fixes

* NULL dates from SFDC now passed to JS code correctly (was 1970 before)

#### Features

* smartRead and updateRecord/s calls now support passing of non-synced IDs (MC_Proxy__c) and automatic lookup to correct record/query
* devUtils:analInc() call - See API docs

#### Breaking Changes

* NONE


### 1.0.2  (2015-11-20)


#### Bug Fixes

* NONE

#### Features

* Promises dep bounce

#### Breaking Changes

* NONE


### 1.0.0  (2015-10-16)


#### Bug Fixes

* NONE

#### Features

* NONE

#### Breaking Changes

* Use on packages only containing 'mobilecaddy1' namespace


### 0.0.2 (2015-10-05)


#### Bug Fixes

* Handle duplicate inserts (same key)
* Fix for running in Codeflow on Chromebooks
* Added protection to "upgradeIfAvailable" for scenario where sync is in progress

#### Features

* New logger module (see API docs)
* New intialSync call (see API docs)
* Internal logging of VF remote failures etc
* Protection on updateRecords calls where supplied ID does not match
* Updates to support platform version 001 and 002 of sync (better handling of failures and deleted records)
* Support for smartSQL reads (see API docs)
* NPM Support

#### Breaking Changes

* none


### 0.0.1-alpha.6 unstable (2015-06-20)


#### Bug Fixes

* Record level CRUD fix
* devUtils.dirtyTables() call added
* Further duplicate sync protection
* Better session clean up on failed syncs due to network error

#### Features

* syncMobileTable updated to support new args (maxTableAge, etc)
* Sync optimisations (sharing of heartbeats)
* Duplicate insert protection

#### Breaking Changes

* none

### 0.0.1-alpha.5 (2015-05-06)


#### Bug Fixes

* none

#### Features

* vsnUtils added
* master/detail insert support
* devUtils.getCurrentUserId()
* First drop of deleteRecord (limited)

#### Breaking Changes

* none


### 0.0.1-alpha.4 (2015-03-05)


#### Bug Fixes

* none

#### Features

* Internal _table meta-tables_ giving 60-80% performance increase in all (if not all) _devUtils_ calls.

#### Breaking Changes

* none


### 0.0.1-alpha.3 (2015-02-17)


#### Bug Fixes

* none

#### Features

* Use of Salesforce Mobile SDK v3.1. Device apps (IPAs/APKs) will need to be upgraded to make use of this

#### Breaking Changes

* none


### 0.0.1-alpha.2 (2015-02-01)


#### Bug Fixes

* HTML _number_ input conversion to string for platform side string datatype

#### Features

* Field level CRUD adherence

#### Breaking Changes

* none