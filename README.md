# nanox

Budgeting and Financial Transparency Tool

nanox is a modeling tool and was born out of a need within Root Systems to have both a living budget and financial transparency so that all members within the organisation are informed and have the opportunity to act with agency.

Given time travels: from right to left (lol)

We can describe the parts of nanox thus:

```
Historiacl record <- live budgets <- forecast
```

## Things Nanox does:

### Transparency
By providing a dashboard containing graphs and live budget reports anyone with access can understand the current financial position of the org.

### Planning/Forecasting
nanox will forecast all incoming products/services, budgets and expenses based on historical records. These will be able to be overridden with a Forecast which will change any one of these 3 things up or down. eg startup assuming large growth period.

### Reporting Platform
nanox is a platform for reports. It attests that reports are particular views of the Nanox model.

 - A Cashflow Report would be a snapshot of the current budgets.
 - A Cashflow forecast would be the current budgets adjusted for changes predicted.
 - A Predicted GST liabilities report would be a report on the GST budget and Forecast of the gst collected until the next GST due date

### Time Travel Transactions
nanox is a transactional system. The addition or removal of any part of the model as well as all transactions throught it will be recorded as an append only log. A user will be able to traverse this history and view the model at any point in time.

## proof of concept notes

each node has

- state
  - balance
- actions
  - can be queued up external or by other nodes async
- updater
  - can sync access own state or other node's state
  - can return actions to queue on other nodes

on each tick

- send each queued up action to respective node
- send TICK action to each node

### components


