/* ------------------------------------------------------------------------------
 *
 *     This code was generated by CGW X-Script Code Generator.
 *
 *     Archymeta Information Technologies Co., Ltd.
 *
 *     Changes to this file, especially those bit flags, may cause incorrect behavior and will be lost if
 *     the code is regenerated.
 * 
 ------------------------------------------------------------------------------ */

var root = process.cwd(), 
    apppath = typeof global.appPath === 'undefined' || global.appPath === '' ? '' : 'config/' + global.appPath + '/',
    path = require('path'),
    config = require(path.join(root, apppath + 'config'));

/* template:
{
    Category: {
        one: function(entity, wrapped) {
            if (entity === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entity;
            if (!wrapped)
                entity.CategoryID = 0;
            else
                entity.DataBehind.CategoryID = 0;
            if (!wrapped)
                entity.CategoryName = '';
            else
                entity.DataBehind.CategoryName = '';
            if (!wrapped)
                entity.Description = undefined;
            else
                entity.DataBehind.Description = undefined;
            if (!wrapped)
                entity.Picture = undefined;
            else
                entity.DataBehind.Picture = undefined;
            return entity;
        },
        many: function(entities, wrapped) {
            if (entities === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entities;
            for (var i = 0, len = entities.length; i < len; i++) {
                if (!wrapped)
                    entities[i].CategoryID = 0;
                else
                    entities[i].DataBehind.CategoryID = 0;
                if (!wrapped)
                    entities[i].CategoryName = '';
                else
                    entities[i].DataBehind.CategoryName = '';
                if (!wrapped)
                    entities[i].Description = undefined;
                else
                    entities[i].DataBehind.Description = undefined;
                if (!wrapped)
                    entities[i].Picture = undefined;
                else
                    entities[i].DataBehind.Picture = undefined;
            }
            return entities;
        }
    },
    CustomerCustomerDemo: {
        one: function(entity, wrapped) {
            if (entity === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entity;
            if (!wrapped)
                entity.CustomerID = '';
            else
                entity.DataBehind.CustomerID = '';
            if (!wrapped)
                entity.CustomerTypeID = '';
            else
                entity.DataBehind.CustomerTypeID = '';
            return entity;
        },
        many: function(entities, wrapped) {
            if (entities === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entities;
            for (var i = 0, len = entities.length; i < len; i++) {
                if (!wrapped)
                    entities[i].CustomerID = '';
                else
                    entities[i].DataBehind.CustomerID = '';
                if (!wrapped)
                    entities[i].CustomerTypeID = '';
                else
                    entities[i].DataBehind.CustomerTypeID = '';
            }
            return entities;
        }
    },
    CustomerDemographic: {
        one: function(entity, wrapped) {
            if (entity === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entity;
            if (!wrapped)
                entity.CustomerTypeID = '';
            else
                entity.DataBehind.CustomerTypeID = '';
            if (!wrapped)
                entity.CustomerDesc = undefined;
            else
                entity.DataBehind.CustomerDesc = undefined;
            return entity;
        },
        many: function(entities, wrapped) {
            if (entities === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entities;
            for (var i = 0, len = entities.length; i < len; i++) {
                if (!wrapped)
                    entities[i].CustomerTypeID = '';
                else
                    entities[i].DataBehind.CustomerTypeID = '';
                if (!wrapped)
                    entities[i].CustomerDesc = undefined;
                else
                    entities[i].DataBehind.CustomerDesc = undefined;
            }
            return entities;
        }
    },
    Customer: {
        one: function(entity, wrapped) {
            if (entity === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entity;
            if (!wrapped)
                entity.CustomerID = '';
            else
                entity.DataBehind.CustomerID = '';
            if (!wrapped)
                entity.CompanyName = '';
            else
                entity.DataBehind.CompanyName = '';
            if (!wrapped)
                entity.Address = undefined;
            else
                entity.DataBehind.Address = undefined;
            if (!wrapped)
                entity.City = undefined;
            else
                entity.DataBehind.City = undefined;
            if (!wrapped)
                entity.ContactName = undefined;
            else
                entity.DataBehind.ContactName = undefined;
            if (!wrapped)
                entity.ContactTitle = undefined;
            else
                entity.DataBehind.ContactTitle = undefined;
            if (!wrapped)
                entity.Country = undefined;
            else
                entity.DataBehind.Country = undefined;
            if (!wrapped)
                entity.Fax = undefined;
            else
                entity.DataBehind.Fax = undefined;
            if (!wrapped)
                entity.Phone = undefined;
            else
                entity.DataBehind.Phone = undefined;
            if (!wrapped)
                entity.PostalCode = undefined;
            else
                entity.DataBehind.PostalCode = undefined;
            if (!wrapped)
                entity.Region = undefined;
            else
                entity.DataBehind.Region = undefined;
            return entity;
        },
        many: function(entities, wrapped) {
            if (entities === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entities;
            for (var i = 0, len = entities.length; i < len; i++) {
                if (!wrapped)
                    entities[i].CustomerID = '';
                else
                    entities[i].DataBehind.CustomerID = '';
                if (!wrapped)
                    entities[i].CompanyName = '';
                else
                    entities[i].DataBehind.CompanyName = '';
                if (!wrapped)
                    entities[i].Address = undefined;
                else
                    entities[i].DataBehind.Address = undefined;
                if (!wrapped)
                    entities[i].City = undefined;
                else
                    entities[i].DataBehind.City = undefined;
                if (!wrapped)
                    entities[i].ContactName = undefined;
                else
                    entities[i].DataBehind.ContactName = undefined;
                if (!wrapped)
                    entities[i].ContactTitle = undefined;
                else
                    entities[i].DataBehind.ContactTitle = undefined;
                if (!wrapped)
                    entities[i].Country = undefined;
                else
                    entities[i].DataBehind.Country = undefined;
                if (!wrapped)
                    entities[i].Fax = undefined;
                else
                    entities[i].DataBehind.Fax = undefined;
                if (!wrapped)
                    entities[i].Phone = undefined;
                else
                    entities[i].DataBehind.Phone = undefined;
                if (!wrapped)
                    entities[i].PostalCode = undefined;
                else
                    entities[i].DataBehind.PostalCode = undefined;
                if (!wrapped)
                    entities[i].Region = undefined;
                else
                    entities[i].DataBehind.Region = undefined;
            }
            return entities;
        }
    },
    Employee: {
        one: function(entity, wrapped) {
            if (entity === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entity;
            if (!wrapped)
                entity.EmployeeID = 0;
            else
                entity.DataBehind.EmployeeID = 0;
            if (!wrapped)
                entity.ReportsTo = undefined;
            else
                entity.DataBehind.ReportsTo = undefined;
            if (!wrapped)
                entity.HireDate = undefined;
            else
                entity.DataBehind.HireDate = undefined;
            if (!wrapped)
                entity.Notes = undefined;
            else
                entity.DataBehind.Notes = undefined;
            if (!wrapped)
                entity.Photo = undefined;
            else
                entity.DataBehind.Photo = undefined;
            if (!wrapped)
                entity.FirstName = '';
            else
                entity.DataBehind.FirstName = '';
            if (!wrapped)
                entity.LastName = '';
            else
                entity.DataBehind.LastName = '';
            if (!wrapped)
                entity.BirthDate = undefined;
            else
                entity.DataBehind.BirthDate = undefined;
            if (!wrapped)
                entity.Address = undefined;
            else
                entity.DataBehind.Address = undefined;
            if (!wrapped)
                entity.City = undefined;
            else
                entity.DataBehind.City = undefined;
            if (!wrapped)
                entity.Country = undefined;
            else
                entity.DataBehind.Country = undefined;
            if (!wrapped)
                entity.Extension = undefined;
            else
                entity.DataBehind.Extension = undefined;
            if (!wrapped)
                entity.HomePhone = undefined;
            else
                entity.DataBehind.HomePhone = undefined;
            if (!wrapped)
                entity.PhotoPath = undefined;
            else
                entity.DataBehind.PhotoPath = undefined;
            if (!wrapped)
                entity.PostalCode = undefined;
            else
                entity.DataBehind.PostalCode = undefined;
            if (!wrapped)
                entity.Region = undefined;
            else
                entity.DataBehind.Region = undefined;
            if (!wrapped)
                entity.Title = undefined;
            else
                entity.DataBehind.Title = undefined;
            if (!wrapped)
                entity.TitleOfCourtesy = undefined;
            else
                entity.DataBehind.TitleOfCourtesy = undefined;
            return entity;
        },
        many: function(entities, wrapped) {
            if (entities === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entities;
            for (var i = 0, len = entities.length; i < len; i++) {
                if (!wrapped)
                    entities[i].EmployeeID = 0;
                else
                    entities[i].DataBehind.EmployeeID = 0;
                if (!wrapped)
                    entities[i].ReportsTo = undefined;
                else
                    entities[i].DataBehind.ReportsTo = undefined;
                if (!wrapped)
                    entities[i].HireDate = undefined;
                else
                    entities[i].DataBehind.HireDate = undefined;
                if (!wrapped)
                    entities[i].Notes = undefined;
                else
                    entities[i].DataBehind.Notes = undefined;
                if (!wrapped)
                    entities[i].Photo = undefined;
                else
                    entities[i].DataBehind.Photo = undefined;
                if (!wrapped)
                    entities[i].FirstName = '';
                else
                    entities[i].DataBehind.FirstName = '';
                if (!wrapped)
                    entities[i].LastName = '';
                else
                    entities[i].DataBehind.LastName = '';
                if (!wrapped)
                    entities[i].BirthDate = undefined;
                else
                    entities[i].DataBehind.BirthDate = undefined;
                if (!wrapped)
                    entities[i].Address = undefined;
                else
                    entities[i].DataBehind.Address = undefined;
                if (!wrapped)
                    entities[i].City = undefined;
                else
                    entities[i].DataBehind.City = undefined;
                if (!wrapped)
                    entities[i].Country = undefined;
                else
                    entities[i].DataBehind.Country = undefined;
                if (!wrapped)
                    entities[i].Extension = undefined;
                else
                    entities[i].DataBehind.Extension = undefined;
                if (!wrapped)
                    entities[i].HomePhone = undefined;
                else
                    entities[i].DataBehind.HomePhone = undefined;
                if (!wrapped)
                    entities[i].PhotoPath = undefined;
                else
                    entities[i].DataBehind.PhotoPath = undefined;
                if (!wrapped)
                    entities[i].PostalCode = undefined;
                else
                    entities[i].DataBehind.PostalCode = undefined;
                if (!wrapped)
                    entities[i].Region = undefined;
                else
                    entities[i].DataBehind.Region = undefined;
                if (!wrapped)
                    entities[i].Title = undefined;
                else
                    entities[i].DataBehind.Title = undefined;
                if (!wrapped)
                    entities[i].TitleOfCourtesy = undefined;
                else
                    entities[i].DataBehind.TitleOfCourtesy = undefined;
            }
            return entities;
        },
        recurs: function(node, wrapped) {
            if (node === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return;
            var proc = function (n) {
                n.DataBehind.EmployeeID = 0;
                n.DataBehind.ReportsTo = undefined;
                n.DataBehind.HireDate = undefined;
                n.DataBehind.Notes = undefined;
                n.DataBehind.Photo = undefined;
                n.DataBehind.FirstName = '';
                n.DataBehind.LastName = '';
                n.DataBehind.BirthDate = undefined;
                n.DataBehind.Address = undefined;
                n.DataBehind.City = undefined;
                n.DataBehind.Country = undefined;
                n.DataBehind.Extension = undefined;
                n.DataBehind.HomePhone = undefined;
                n.DataBehind.PhotoPath = undefined;
                n.DataBehind.PostalCode = undefined;
                n.DataBehind.Region = undefined;
                n.DataBehind.Title = undefined;
                n.DataBehind.TitleOfCourtesy = undefined;
                if (n.ChildExists) {
                    for (var i = 0, len = n.ChildEntities.length; i < len; i++) 
                        proc(n.ChildEntities[i]);
                }
            };
            proc(node);
            return node;
        }
    },
    EmployeeTerritory: {
        one: function(entity, wrapped) {
            if (entity === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entity;
            if (!wrapped)
                entity.EmployeeID = 0;
            else
                entity.DataBehind.EmployeeID = 0;
            if (!wrapped)
                entity.TerritoryID = '';
            else
                entity.DataBehind.TerritoryID = '';
            return entity;
        },
        many: function(entities, wrapped) {
            if (entities === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entities;
            for (var i = 0, len = entities.length; i < len; i++) {
                if (!wrapped)
                    entities[i].EmployeeID = 0;
                else
                    entities[i].DataBehind.EmployeeID = 0;
                if (!wrapped)
                    entities[i].TerritoryID = '';
                else
                    entities[i].DataBehind.TerritoryID = '';
            }
            return entities;
        }
    },
    Order_Detail: {
        one: function(entity, wrapped) {
            if (entity === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entity;
            if (!wrapped)
                entity.OrderID = 0;
            else
                entity.DataBehind.OrderID = 0;
            if (!wrapped)
                entity.ProductID = 0;
            else
                entity.DataBehind.ProductID = 0;
            if (!wrapped)
                entity.Quantity = 0;
            else
                entity.DataBehind.Quantity = 0;
            if (!wrapped)
                entity.Discount = 0;
            else
                entity.DataBehind.Discount = 0;
            if (!wrapped)
                entity.UnitPrice = 0;
            else
                entity.DataBehind.UnitPrice = 0;
            return entity;
        },
        many: function(entities, wrapped) {
            if (entities === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entities;
            for (var i = 0, len = entities.length; i < len; i++) {
                if (!wrapped)
                    entities[i].OrderID = 0;
                else
                    entities[i].DataBehind.OrderID = 0;
                if (!wrapped)
                    entities[i].ProductID = 0;
                else
                    entities[i].DataBehind.ProductID = 0;
                if (!wrapped)
                    entities[i].Quantity = 0;
                else
                    entities[i].DataBehind.Quantity = 0;
                if (!wrapped)
                    entities[i].Discount = 0;
                else
                    entities[i].DataBehind.Discount = 0;
                if (!wrapped)
                    entities[i].UnitPrice = 0;
                else
                    entities[i].DataBehind.UnitPrice = 0;
            }
            return entities;
        }
    },
    Order: {
        one: function(entity, wrapped) {
            if (entity === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entity;
            if (!wrapped)
                entity.OrderID = 0;
            else
                entity.DataBehind.OrderID = 0;
            if (!wrapped)
                entity.CustomerID = undefined;
            else
                entity.DataBehind.CustomerID = undefined;
            if (!wrapped)
                entity.ShipVia = undefined;
            else
                entity.DataBehind.ShipVia = undefined;
            if (!wrapped)
                entity.EmployeeID = undefined;
            else
                entity.DataBehind.EmployeeID = undefined;
            if (!wrapped)
                entity.Freight = undefined;
            else
                entity.DataBehind.Freight = undefined;
            if (!wrapped)
                entity.OrderDate = undefined;
            else
                entity.DataBehind.OrderDate = undefined;
            if (!wrapped)
                entity.ShipName = undefined;
            else
                entity.DataBehind.ShipName = undefined;
            if (!wrapped)
                entity.RequiredDate = undefined;
            else
                entity.DataBehind.RequiredDate = undefined;
            if (!wrapped)
                entity.ShipAddress = undefined;
            else
                entity.DataBehind.ShipAddress = undefined;
            if (!wrapped)
                entity.ShipCity = undefined;
            else
                entity.DataBehind.ShipCity = undefined;
            if (!wrapped)
                entity.ShipCountry = undefined;
            else
                entity.DataBehind.ShipCountry = undefined;
            if (!wrapped)
                entity.ShippedDate = undefined;
            else
                entity.DataBehind.ShippedDate = undefined;
            if (!wrapped)
                entity.ShipPostalCode = undefined;
            else
                entity.DataBehind.ShipPostalCode = undefined;
            if (!wrapped)
                entity.ShipRegion = undefined;
            else
                entity.DataBehind.ShipRegion = undefined;
            return entity;
        },
        many: function(entities, wrapped) {
            if (entities === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entities;
            for (var i = 0, len = entities.length; i < len; i++) {
                if (!wrapped)
                    entities[i].OrderID = 0;
                else
                    entities[i].DataBehind.OrderID = 0;
                if (!wrapped)
                    entities[i].CustomerID = undefined;
                else
                    entities[i].DataBehind.CustomerID = undefined;
                if (!wrapped)
                    entities[i].ShipVia = undefined;
                else
                    entities[i].DataBehind.ShipVia = undefined;
                if (!wrapped)
                    entities[i].EmployeeID = undefined;
                else
                    entities[i].DataBehind.EmployeeID = undefined;
                if (!wrapped)
                    entities[i].Freight = undefined;
                else
                    entities[i].DataBehind.Freight = undefined;
                if (!wrapped)
                    entities[i].OrderDate = undefined;
                else
                    entities[i].DataBehind.OrderDate = undefined;
                if (!wrapped)
                    entities[i].ShipName = undefined;
                else
                    entities[i].DataBehind.ShipName = undefined;
                if (!wrapped)
                    entities[i].RequiredDate = undefined;
                else
                    entities[i].DataBehind.RequiredDate = undefined;
                if (!wrapped)
                    entities[i].ShipAddress = undefined;
                else
                    entities[i].DataBehind.ShipAddress = undefined;
                if (!wrapped)
                    entities[i].ShipCity = undefined;
                else
                    entities[i].DataBehind.ShipCity = undefined;
                if (!wrapped)
                    entities[i].ShipCountry = undefined;
                else
                    entities[i].DataBehind.ShipCountry = undefined;
                if (!wrapped)
                    entities[i].ShippedDate = undefined;
                else
                    entities[i].DataBehind.ShippedDate = undefined;
                if (!wrapped)
                    entities[i].ShipPostalCode = undefined;
                else
                    entities[i].DataBehind.ShipPostalCode = undefined;
                if (!wrapped)
                    entities[i].ShipRegion = undefined;
                else
                    entities[i].DataBehind.ShipRegion = undefined;
            }
            return entities;
        }
    },
    Product: {
        one: function(entity, wrapped) {
            if (entity === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entity;
            if (!wrapped)
                entity.ProductID = 0;
            else
                entity.DataBehind.ProductID = 0;
            if (!wrapped)
                entity.CategoryID = undefined;
            else
                entity.DataBehind.CategoryID = undefined;
            if (!wrapped)
                entity.SupplierID = undefined;
            else
                entity.DataBehind.SupplierID = undefined;
            if (!wrapped)
                entity.ProductName = '';
            else
                entity.DataBehind.ProductName = '';
            if (!wrapped)
                entity.Discontinued = false;
            else
                entity.DataBehind.Discontinued = false;
            if (!wrapped)
                entity.QuantityPerUnit = undefined;
            else
                entity.DataBehind.QuantityPerUnit = undefined;
            if (!wrapped)
                entity.ReorderLevel = undefined;
            else
                entity.DataBehind.ReorderLevel = undefined;
            if (!wrapped)
                entity.UnitPrice = undefined;
            else
                entity.DataBehind.UnitPrice = undefined;
            if (!wrapped)
                entity.UnitsInStock = undefined;
            else
                entity.DataBehind.UnitsInStock = undefined;
            if (!wrapped)
                entity.UnitsOnOrder = undefined;
            else
                entity.DataBehind.UnitsOnOrder = undefined;
            return entity;
        },
        many: function(entities, wrapped) {
            if (entities === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entities;
            for (var i = 0, len = entities.length; i < len; i++) {
                if (!wrapped)
                    entities[i].ProductID = 0;
                else
                    entities[i].DataBehind.ProductID = 0;
                if (!wrapped)
                    entities[i].CategoryID = undefined;
                else
                    entities[i].DataBehind.CategoryID = undefined;
                if (!wrapped)
                    entities[i].SupplierID = undefined;
                else
                    entities[i].DataBehind.SupplierID = undefined;
                if (!wrapped)
                    entities[i].ProductName = '';
                else
                    entities[i].DataBehind.ProductName = '';
                if (!wrapped)
                    entities[i].Discontinued = false;
                else
                    entities[i].DataBehind.Discontinued = false;
                if (!wrapped)
                    entities[i].QuantityPerUnit = undefined;
                else
                    entities[i].DataBehind.QuantityPerUnit = undefined;
                if (!wrapped)
                    entities[i].ReorderLevel = undefined;
                else
                    entities[i].DataBehind.ReorderLevel = undefined;
                if (!wrapped)
                    entities[i].UnitPrice = undefined;
                else
                    entities[i].DataBehind.UnitPrice = undefined;
                if (!wrapped)
                    entities[i].UnitsInStock = undefined;
                else
                    entities[i].DataBehind.UnitsInStock = undefined;
                if (!wrapped)
                    entities[i].UnitsOnOrder = undefined;
                else
                    entities[i].DataBehind.UnitsOnOrder = undefined;
            }
            return entities;
        }
    },
    Region: {
        one: function(entity, wrapped) {
            if (entity === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entity;
            if (!wrapped)
                entity.RegionID = 0;
            else
                entity.DataBehind.RegionID = 0;
            if (!wrapped)
                entity.RegionDescription = '';
            else
                entity.DataBehind.RegionDescription = '';
            return entity;
        },
        many: function(entities, wrapped) {
            if (entities === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entities;
            for (var i = 0, len = entities.length; i < len; i++) {
                if (!wrapped)
                    entities[i].RegionID = 0;
                else
                    entities[i].DataBehind.RegionID = 0;
                if (!wrapped)
                    entities[i].RegionDescription = '';
                else
                    entities[i].DataBehind.RegionDescription = '';
            }
            return entities;
        }
    },
    Shipper: {
        one: function(entity, wrapped) {
            if (entity === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entity;
            if (!wrapped)
                entity.ShipperID = 0;
            else
                entity.DataBehind.ShipperID = 0;
            if (!wrapped)
                entity.CompanyName = '';
            else
                entity.DataBehind.CompanyName = '';
            if (!wrapped)
                entity.Phone = undefined;
            else
                entity.DataBehind.Phone = undefined;
            return entity;
        },
        many: function(entities, wrapped) {
            if (entities === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entities;
            for (var i = 0, len = entities.length; i < len; i++) {
                if (!wrapped)
                    entities[i].ShipperID = 0;
                else
                    entities[i].DataBehind.ShipperID = 0;
                if (!wrapped)
                    entities[i].CompanyName = '';
                else
                    entities[i].DataBehind.CompanyName = '';
                if (!wrapped)
                    entities[i].Phone = undefined;
                else
                    entities[i].DataBehind.Phone = undefined;
            }
            return entities;
        }
    },
    Supplier: {
        one: function(entity, wrapped) {
            if (entity === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entity;
            if (!wrapped)
                entity.SupplierID = 0;
            else
                entity.DataBehind.SupplierID = 0;
            if (!wrapped)
                entity.CompanyName = '';
            else
                entity.DataBehind.CompanyName = '';
            if (!wrapped)
                entity.HomePage = undefined;
            else
                entity.DataBehind.HomePage = undefined;
            if (!wrapped)
                entity.Address = undefined;
            else
                entity.DataBehind.Address = undefined;
            if (!wrapped)
                entity.City = undefined;
            else
                entity.DataBehind.City = undefined;
            if (!wrapped)
                entity.ContactName = undefined;
            else
                entity.DataBehind.ContactName = undefined;
            if (!wrapped)
                entity.ContactTitle = undefined;
            else
                entity.DataBehind.ContactTitle = undefined;
            if (!wrapped)
                entity.Country = undefined;
            else
                entity.DataBehind.Country = undefined;
            if (!wrapped)
                entity.Fax = undefined;
            else
                entity.DataBehind.Fax = undefined;
            if (!wrapped)
                entity.Phone = undefined;
            else
                entity.DataBehind.Phone = undefined;
            if (!wrapped)
                entity.PostalCode = undefined;
            else
                entity.DataBehind.PostalCode = undefined;
            if (!wrapped)
                entity.Region = undefined;
            else
                entity.DataBehind.Region = undefined;
            return entity;
        },
        many: function(entities, wrapped) {
            if (entities === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entities;
            for (var i = 0, len = entities.length; i < len; i++) {
                if (!wrapped)
                    entities[i].SupplierID = 0;
                else
                    entities[i].DataBehind.SupplierID = 0;
                if (!wrapped)
                    entities[i].CompanyName = '';
                else
                    entities[i].DataBehind.CompanyName = '';
                if (!wrapped)
                    entities[i].HomePage = undefined;
                else
                    entities[i].DataBehind.HomePage = undefined;
                if (!wrapped)
                    entities[i].Address = undefined;
                else
                    entities[i].DataBehind.Address = undefined;
                if (!wrapped)
                    entities[i].City = undefined;
                else
                    entities[i].DataBehind.City = undefined;
                if (!wrapped)
                    entities[i].ContactName = undefined;
                else
                    entities[i].DataBehind.ContactName = undefined;
                if (!wrapped)
                    entities[i].ContactTitle = undefined;
                else
                    entities[i].DataBehind.ContactTitle = undefined;
                if (!wrapped)
                    entities[i].Country = undefined;
                else
                    entities[i].DataBehind.Country = undefined;
                if (!wrapped)
                    entities[i].Fax = undefined;
                else
                    entities[i].DataBehind.Fax = undefined;
                if (!wrapped)
                    entities[i].Phone = undefined;
                else
                    entities[i].DataBehind.Phone = undefined;
                if (!wrapped)
                    entities[i].PostalCode = undefined;
                else
                    entities[i].DataBehind.PostalCode = undefined;
                if (!wrapped)
                    entities[i].Region = undefined;
                else
                    entities[i].DataBehind.Region = undefined;
            }
            return entities;
        }
    },
    Territory: {
        one: function(entity, wrapped) {
            if (entity === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entity;
            if (!wrapped)
                entity.TerritoryID = '';
            else
                entity.DataBehind.TerritoryID = '';
            if (!wrapped)
                entity.RegionID = 0;
            else
                entity.DataBehind.RegionID = 0;
            if (!wrapped)
                entity.TerritoryDescription = '';
            else
                entity.DataBehind.TerritoryDescription = '';
            return entity;
        },
        many: function(entities, wrapped) {
            if (entities === null || typeof config.disablePropertyFiltering !== 'undefined' && config.disablePropertyFiltering === true)
                return entities;
            for (var i = 0, len = entities.length; i < len; i++) {
                if (!wrapped)
                    entities[i].TerritoryID = '';
                else
                    entities[i].DataBehind.TerritoryID = '';
                if (!wrapped)
                    entities[i].RegionID = 0;
                else
                    entities[i].DataBehind.RegionID = 0;
                if (!wrapped)
                    entities[i].TerritoryDescription = '';
                else
                    entities[i].DataBehind.TerritoryDescription = '';
            }
            return entities;
        }
    },
}
*/
module.exports = {
}