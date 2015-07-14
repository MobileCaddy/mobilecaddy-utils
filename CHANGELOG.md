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