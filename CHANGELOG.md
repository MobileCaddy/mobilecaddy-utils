# CHANGELOG

## 3.0.6 (24th Nov 2022)

### Bugfix
* MSD-641 - IntialSync calls in parallel if on 3GC
* MSD-642 - Dynmanic namespace in FileUtils File_Library field names (e.g. 'cdfy__')
* MSD-643 - Move file downloads into `../media`
* MSD-644 - Utils as the SDK for a media digest
* MSD-645 - Ask container for appconfig as it may have already downloaded it


## 3.0.5 (14th Oct 2022)

### Bugfix
* CDFYCLI-3 fileUtils now returns `[{status:200}]` if there are no files to download or running in CodeFlow


## 3.0.4 (11th Oct 2022)

### Bugfix

* MSD-740 - Better handling of file downloads, including retry and fix for iOS plugin response handling
* MSD-740 - Android file saving in `appbundle` dir and serving via links rather than base64


## 3.0.3 (15th Sep 2022)

### Bugfix

* Re-add NOT hiding splashscreen in startup

## 3.0.2 (15th Aug 2022)

### Bugfix

* Complete applicationCache deprecation support

## 3.0.1 (NOT YET RELEASED)

### Features / Improvements

* fileUtils support for CDFY marketing viewer

## 3.0.0 (29th March 2022)

### Bug Fixes

* NONE

### Features / Improvements

* Support for transactions via container for 3GC
* MockCordova support for SELECT WHERE IN(integer) queries
* Major perf improvements when deleting records
* 3GC+ - pass mcBaseBuildVersion up in getAppConfig001 call

## 1.9.3 (2018-09-03)

### Bug Fixes

- MSD-624 Fix Date/Datetime data-type bug introduxed in MSD-620 v1.9.0

### Features / Improvements

- NONE

### Breaking Changes

- NONE

## 1.9.2 (2018-08-20)

### Bug Fixes

- None

### Features / Improvements

- Info on failed syncs (insert/update) recorded and available via the devUtils.

### Breaking Changes

- NONE

## 1.9.1 (2018-08-09)

### Bug Fixes

- Skipping sync-too-soon check, if we're in an initialSync call.
- If 2nd table of 4+ fails then result of processing the sync queue failed.

### Features / Improvements

- Deep clone input to 'insertRecords' and 'updateRecords' as input is mutable (and unsafe)

### Breaking Changes

- NONE

## 1.8.2 (2018-07-29)

### Bug Fixes

- InitialSync now retries failed tables (total 3 retries) and if failed then rejects the promise.

### Features / Improvements

- Allow dev to spec localStorage to persist through upgrades

### Breaking Changes

- NONE## 1.8.0 (2018-29-05)

### Bug Fixes

- Array.prototype.find() Polyfill for older Browsers
- SnapShot records not being deleted for Inserts with "stbe" == "D"
- null handling for datetime, and bugfix (I think) in general null handling - were incorrectly setting previousValues to null also
- Bugfix correctly deleting Insert M2P responses that should be removed check also

### Features / Improvements

- SOQL syntax includes support for "SELECT {TABLE:FIELD} FROM... "

### Breaking Changes

- NONE

## 1.7.4

### Bug Fixes

- Protect against handling of already handled csStatusCheck response in "Received Processed" scenario.
- Clear localStorage on logout

### Features / Improvements

- NONE

### Breaking Changes

- NONE

### 1.7.3 (2018-16-04)

#### Bug Fixes

- Re-log all args passed to logger.

#### Features

- Support for recTypeDevName

#### Breaking Changes

- NONE

### 1.7.2 (2018-15-03)

#### Bug Fixes

- Incorrect handling of 100497 sync status, meant error was thrown and incomplete sync was attempted.

#### Features

- NONE

#### Breaking Changes

- NONE

### 1.7.1 (2018-26-02)

#### Bug Fixes

- Re-removing cache-skip, as still causing issues
- String.includes polufill for older devices

#### Features

- Sync6 "CS in Head" opimisations
- skipP2M flag in syncMobileTable call

#### Breaking Changes

- NONE

### 1.6.0 (2017-05-24)

#### Bug Fixes

- NONE

#### Features

- Sync4 support, through use of MC_Resorce v1.2.0

#### Breaking Changes

- NONE

### 1.5.2 (2017-04-10)

#### Bug Fixes

- updateUpdate Handling
- Desktop DV OTA upgrade support
- Protection aginst race condition in csStatusCheck response

#### Features

- Use of MC_Resorce v1.1.3

#### Breaking Changes

- NONE

### 1.5.1 (2017-02-15)

#### Bug Fixes

- NONE

#### Features

- Use of MC_Resorce v1.1.1

#### Breaking Changes

- No longer uses "mobilecaddy-desktop" string as identifier for Desktop environment. Only using bugfix semver as literally no one is using this yet.

### 1.5.0 (2017-01-30)

#### Bug Fixes

- NONE

#### Features

- Use of MC_Resorce v1.1.0
- devUtils.getCurrentUserName()
- devUtils.getUserLocale()
- devUtils.getCachedAppSoupValue(key)

#### Breaking Changes

- NONE

### 1.4.0 (2017-01-23)

#### Bug Fixes

- NONE

#### Features

- Use of MC_Resorce v1.0.0
- Electron / Desktop Support
- New dirtyFlag support

#### Breaking Changes

- NONE

### 1.3.2 (2016-10-24)

#### Bug Fixes

- Bugfix - null date handling

#### Features

- NONE

#### Breaking Changes

- NONE

### 1.3.1 (2016-10-14)

#### Bug Fixes

- Bugfix - issue seen with boolean handling in new createUpdateJSON code

#### Features

- NONE

#### Breaking Changes

- NONE

### 1.3.0 (2016-10-13)

#### Bug Fixes

- NONE

#### Features

- v0.2.0 of mobilecaddy-utils.min.js
- m2p JSON built natively
- DOT support
- Dynamic vfRemote Injection
- Parallel p2m Sync Protection

#### Breaking Changes

- NONE

### 1.2.0 (2016-08-03)

#### Bug Fixes

- Corrected handling of Dates across timezones
- Correct handling of csStatusCheck failure handling

#### Features

- v0.1.4 of mobilecaddy-utils.min.js
- Added errorLog in upcoming JSON in csStatusCheck calls - for better debugging

#### Breaking Changes

- NONE

### 1.1.1 (2016-01-31)

#### Bug Fixes

- NULL dates from SFDC now passed to JS code correctly (was 1970 before)

#### Features

- smartRead and updateRecord/s calls now support passing of non-synced IDs (MC_Proxy\_\_c) and automatic lookup to correct record/query
- devUtils:analInc() call - See API docs

#### Breaking Changes

- NONE

### 1.0.2 (2015-11-20)

#### Bug Fixes

- NONE

#### Features

- Promises dep bounce

#### Breaking Changes

- NONE

### 1.0.0 (2015-10-16)

#### Bug Fixes

- NONE

#### Features

- NONE

#### Breaking Changes

- Use on packages only containing 'mobilecaddy1' namespace

### 0.0.2 (2015-10-05)

#### Bug Fixes

- Handle duplicate inserts (same key)
- Fix for running in Codeflow on Chromebooks
- Added protection to "upgradeIfAvailable" for scenario where sync is in progress

#### Features

- New logger module (see API docs)
- New intialSync call (see API docs)
- Internal logging of VF remote failures etc
- Protection on updateRecords calls where supplied ID does not match
- Updates to support platform version 001 and 002 of sync (better handling of failures and deleted records)
- Support for smartSQL reads (see API docs)
- NPM Support

#### Breaking Changes

- none

### 0.0.1-alpha.6 unstable (2015-06-20)

#### Bug Fixes

- Record level CRUD fix
- devUtils.dirtyTables() call added
- Further duplicate sync protection
- Better session clean up on failed syncs due to network error

#### Features

- syncMobileTable updated to support new args (maxTableAge, etc)
- Sync optimisations (sharing of heartbeats)
- Duplicate insert protection

#### Breaking Changes

- none

### 0.0.1-alpha.5 (2015-05-06)

#### Bug Fixes

- none

#### Features

- vsnUtils added
- master/detail insert support
- devUtils.getCurrentUserId()
- First drop of deleteRecord (limited)

#### Breaking Changes

- none

### 0.0.1-alpha.4 (2015-03-05)

#### Bug Fixes

- none

#### Features

- Internal _table meta-tables_ giving 60-80% performance increase in all (if not all) _devUtils_ calls.

#### Breaking Changes

- none

### 0.0.1-alpha.3 (2015-02-17)

#### Bug Fixes

- none

#### Features

- Use of Salesforce Mobile SDK v3.1. Device apps (IPAs/APKs) will need to be upgraded to make use of this

#### Breaking Changes

- none

### 0.0.1-alpha.2 (2015-02-01)

#### Bug Fixes

- HTML _number_ input conversion to string for platform side string datatype

#### Features

- Field level CRUD adherence

#### Breaking Changes

- none
