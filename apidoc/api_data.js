define({ "api": [  {    "type": "get",    "url": "/admin/offers",    "title": "Get all the offers",    "group": "Admin_Offers",    "version": "1.0.0",    "permission": [      {        "name": "admin"      }    ],    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "   HTTP/1.1 200 OK\n   [{\n    \"user\": {\n        \"id\": \"56a407a0-2527-4981-9e8c-d44f93b0a8f3\",\n        \"email\": \"samantha.chery@hetic.net\",\n        \"admin\": false\n    },\n    \"project\": {\n        \"id\": \"61476be1-fc5f-4e20-ab0a-c8395bd8a45c\",\n        \"title\": \"Un vélo\",\n        \"description\": \"svp c'est pour bb\",\n        \"price\": 300,\n        \"interests\": 0.1,\n        \"state\": \"unvalid\",\n        \"timeLaps\": 3,\n        \"createdDate\": \"2019-03-14T08:49:43.790Z\"\n    },\n    \"state\": \"waiting\",\n    \"id\": \"e2cdf473-8e19-46e1-95ed-f89ca4a74f23\",\n    \"createdDate\": \"2019-03-14T12:48:38.294Z\",\n    \"signed_by_owner\": false,\n    \"signed_by_investor\": false\n}]",          "type": "json"        }      ]    },    "filename": "src/routes/admin/offers.ts",    "groupTitle": "Admin_Offers",    "name": "GetAdminOffers"  },  {    "type": "get",    "url": "/admin/projects",    "title": "Get all the project and user associed",    "group": "Admin_Project",    "version": "1.0.0",    "permission": [      {        "name": "admin"      }    ],    "filename": "src/routes/admin/projects.ts",    "groupTitle": "Admin_Project",    "name": "GetAdminProjects"  },  {    "type": "get",    "url": "/admin/projects/valid/:id",    "title": "Validation of the project",    "group": "Admin_Project",    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "integer",            "optional": false,            "field": "id",            "description": "<p>Mandatory Id of the project</p>"          }        ]      }    },    "permission": [      {        "name": "admin"      }    ],    "filename": "src/routes/admin/projects.ts",    "groupTitle": "Admin_Project",    "name": "GetAdminProjectsValidId"  },  {    "type": "get",    "url": "/admin/users",    "title": "Get all the user",    "group": "Admin_Users",    "version": "1.0.0",    "permission": [      {        "name": "admin"      }    ],    "filename": "src/routes/admin/users.ts",    "groupTitle": "Admin_Users",    "name": "GetAdminUsers"  },  {    "type": "get",    "url": "/admin/users/count",    "title": "Count the number of user",    "group": "Admin_Users",    "version": "1.0.0",    "permission": [      {        "name": "admin"      }    ],    "filename": "src/routes/admin/users.ts",    "groupTitle": "Admin_Users",    "name": "GetAdminUsersCount"  },  {    "type": "post",    "url": "/offers/accept",    "title": "Accept offer",    "version": "1.0.0",    "name": "AcceptOffer",    "description": "<p>The project's owen accept the offer. Turn project's state to running. Return the offer. Create the deadlines refound</p>",    "group": "Offer",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "offer_id",            "description": "<p>Mandatory - id of the offer.</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "  HTTP/1.1 200 OK\n  {\n    \"state\": \"accepted\",\n    \"signature_investor_photo_key\": null,\n    \"id\": \"49f59cab-7c0b-4951-8399-00996307771b\",\n    \"createdDate\": \"2019-04-26T07:21:02.527Z\"\n}",          "type": "json"        }      ]    },    "filename": "src/routes/offers.ts",    "groupTitle": "Offer"  },  {    "type": "post",    "url": "/offers",    "title": "Create a offer",    "version": "1.0.0",    "name": "CreateOffer",    "description": "<p>Create a new offer - investor will be linked by is token. By default, offer state is &quot;waiting&quot; for an action from the project's owner. If the owner accept, will be set to &quot;accepted&quot;, if he refuse will be set to &quot;refused&quot;. Turn the project's state to waiting (for acceptation by the project's owner). Return the offer, the investor and the project.</p>",    "group": "Offer",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "project_id",            "description": "<p>Mandatory - Project's id.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "signature",            "description": "<p>Signature image - base64 file</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "  HTTP/1.1 200 OK\n  {\n      \"user\": {\n         \"id\": \"a04d7e98-09f5-4890-bc4d-a89a799c3d65\",\n         \"email\": \"tooooo@gmail.com\",\n         \"admin\": false\n      },\n      \"project\": {\n          \"id\": \"b0e5e002-0be8-46be-a2ea-20fbf5426116\",\n          \"title\": \"un vélo\",\n          \"description\": \"svp c'est urgent\",\n          \"price\": 200,\n          \"interests\": 0.01,\n          \"state\": \"waiting\",\n          \"timeLaps\": 3,\n          \"createdDate\": \"2019-04-26T07:16:14.010Z\",\n          \"signature_owner_photo_key\": null\n      },\n      \"state\": \"waiting\",\n      \"signature_investor_photo_key\": null,\n      \"id\": \"49f59cab-7c0b-4951-8399-00996307771b\",\n      \"createdDate\": \"2019-04-26T07:21:02.527Z\"\n}",          "type": "json"        }      ]    },    "filename": "src/routes/offers.ts",    "groupTitle": "Offer"  },  {    "type": "post",    "url": "/offers/refuse",    "title": "Refuse offer",    "version": "1.0.0",    "name": "RefuseOffer",    "description": "<p>Project's owner can refuse the offer. Turn back the projet's state to valid to receive an another offer. Return the offer.</p>",    "group": "Offer",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "offer_id",            "description": "<p>Mandatory - id of the offer.</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "  HTTP/1.1 200 OK\n  {\n    \"state\": \"refused\",\n    \"signature_investor_photo_key\": null,\n    \"id\": \"49f59cab-7c0b-4951-8399-00996307771b\",\n    \"createdDate\": \"2019-04-26T07:21:02.527Z\"\n}",          "type": "json"        }      ]    },    "filename": "src/routes/offers.ts",    "groupTitle": "Offer"  },  {    "type": "get",    "url": "/offers/:id",    "title": "Get the deadlines refound off the offer",    "version": "1.0.0",    "name": "deadlinesRefound",    "description": "<p>Retrieve all the deadlines and there status on a offer linked to a project.</p>",    "group": "Offer",    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "  HTTP/1.1 200 OK\n  {\n    \"id\": \"49f59cab-7c0b-4951-8399-00996307771b\",\n    \"state\": \"accepted\",\n    \"createdDate\": \"2019-04-26T07:21:02.527Z\",\n    \"signature_investor_photo_key\": null,\n    \"refounds\": [\n        {\n            \"id\": \"637faef8-daf4-4415-ad6a-50509ed685c5\",\n            \"amount\": 66.8333333333333,\n            \"state\": \"waiting\",\n            \"createdDate\": \"2019-05-16T14:10:31.224Z\",\n            \"dueDate\": \"2019-06-16T14:10:31.224Z\"\n        },\n        {\n            \"id\": \"aadbf202-89ee-4e5a-8022-dd30b02ec01a\",\n            \"amount\": 66.8333333333333,\n            \"state\": \"waiting\",\n            \"createdDate\": \"2019-05-16T14:39:11.584Z\",\n            \"dueDate\": \"2019-07-16T14:39:11.584Z\"\n        }\n    ]\n}",          "type": "json"        }      ]    },    "filename": "src/routes/offers.ts",    "groupTitle": "Offer"  },  {    "type": "post",    "url": "/projects",    "title": "Create project",    "version": "1.0.0",    "name": "CreateProject",    "description": "<p>Create a new project. By default, project state is set to &quot;valid&quot;. Will be change to &quot;unvalid&quot; and requiere manuel admin validation. When a investor make an offer, the project state turn to &quot;waiting&quot; -- mean an action from ower. He can accept the offer, turn the project to &quot;running&quot; (refounding) or refuse, project will turn back to valid for now. When the last refound is made, the project state will be set to &quot;complete&quot;. For now, no need to send interests rate, will be set to 0.01 by default.</p>",    "group": "Project",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "title",            "description": "<p>Mandatory Project's title.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>Mandatory Project's description.</p>"          },          {            "group": "Parameter",            "type": "Integer",            "optional": false,            "field": "price",            "description": "<p>Mandatory Amount wanted by the borrower.</p>"          },          {            "group": "Parameter",            "type": "Integer",            "optional": false,            "field": "timeLaps",            "description": "<p>Mandatory Number of month choose for the refund process duration.</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n   \"id\": \"b0e5e002-0be8-46be-a2ea-20fbf5426116\",\n   \"title\": \"un vélo\",\n   \"description\": \"svp c'est urgent\",\n   \"price\": 200,\n   \"interests\": 0.01,\n   \"state\": \"valid\",\n   \"timeLaps\": 3,\n   \"createdDate\": \"2019-04-26T07:16:14.010Z\",\n   \"signature_owner_photo_key\": null\n}",          "type": "json"        }      ]    },    "filename": "src/routes/projects.ts",    "groupTitle": "Project"  },  {    "type": "get",    "url": "/projects/:id",    "title": "Get Details",    "version": "1.0.0",    "name": "Project",    "description": "<p>Get details on a project</p>",    "group": "Project",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "integer",            "optional": false,            "field": "id",            "description": "<p>Mandatory Id of the project</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n   \"id\": \"b0e5e002-0be8-46be-a2ea-20fbf5426116\",\n   \"title\": \"un vélo\",\n   \"description\": \"svp c'est urgent\",\n   \"price\": 200,\n   \"interests\": 0.01,\n   \"state\": \"valid\",\n   \"timeLaps\": 3,\n   \"createdDate\": \"2019-04-26T07:16:14.010Z\",\n   \"signature_owner_photo_key\": null\n}",          "type": "json"        }      ]    },    "filename": "src/routes/projects.ts",    "groupTitle": "Project"  },  {    "type": "get",    "url": "/projects",    "title": "Get Valid only",    "version": "1.0.0",    "name": "Projects",    "description": "<p>Get all the valid projects</p>",    "group": "Project",    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "   HTTP/1.1 200 OK\n   [{\n    \"id\": \"b0e5e002-0be8-46be-a2ea-20fbf5426116\",\n    \"title\": \"un vélo\",\n    \"description\": \"svp c'est urgent\",\n    \"price\": 200,\n    \"interests\": 0.01,\n    \"state\": \"valid\",\n    \"timeLaps\": 3,\n    \"createdDate\": \"2019-04-26T07:16:14.010Z\",\n    \"signature_owner_photo_key\": null\n}]",          "type": "json"        }      ]    },    "filename": "src/routes/projects.ts",    "groupTitle": "Project"  },  {    "type": "GET",    "url": "/users/dashboard",    "title": "Dashboard",    "description": "<p>Retrieve all the user's projects and offers using his token.</p>",    "group": "Users",    "version": "1.0.0",    "success": {      "examples": [        {          "title": "Success-Response:",          "content": " HTTP/1.1 200 OK\n {\n    \"id\": \"068f84b1-a282-4ac4-8af6-8312e401f46e\",\n    \"email\": \"saaaaaa@gmail.com\",\n    \"firstname\": \"saaaaam\",\n    \"lastname\": \"chery\",\n    \"birthdate\": \"1992-06-12T00:00:00.000Z\",\n    \"birthplace\": \"blois\",\n    \"adress\": \"9 pierre dupond\",\n    \"city\": \"paris\",\n    \"postCode\": 75010,\n    \"identity_key\": null,\n    \"face_photo_key\": null,\n    \"admin\": false,\n    \"createdDate\": \"2019-04-26T07:12:59.365Z\",\n    \"projects\": {\n           \"id\": \"b0e5e002-0be8-46be-a2ea-20fbf5426116\",\n           \"title\": \"un vélo\",\n           \"description\": \"svp c'est urgent\",\n           \"price\": 200,\n           \"interests\": 0.01,\n           \"state\": \"running\",\n           \"timeLaps\": 3,\n           \"createdDate\": \"2019-04-26T07:16:14.010Z\",\n           \"signature_owner_photo_key\": null\n    }\n   \"offers\": [{\n       \"id\": \"49f59cab-7c0b-4951-8399-00996307771b\",\n       \"state\": \"accepted\",\n       \"createdDate\": \"2019-04-26T07:21:02.527Z\",\n       \"signature_investor_photo_key\": null\n       \"project\": {\n           \"id\": \"b0e5e002-0be8-46be-a2ea-20fbf5426116\",\n           \"title\": \"un vélo\",\n           \"description\": \"svp c'est urgent\",\n           \"price\": 200,\n           \"interests\": 0.01,\n           \"state\": \"waiting\",\n           \"timeLaps\": 3,\n           \"createdDate\": \"2019-04-26T07:16:14.010Z\",\n           \"signature_owner_photo_key\": null\n       }\n   }]\n}",          "type": "json"        }      ]    },    "filename": "src/routes/users.ts",    "groupTitle": "Users",    "name": "GetUsersDashboard"  },  {    "type": "GET",    "url": "/users/face_photo",    "title": "User's face photo file",    "group": "Users",    "version": "1.0.0",    "filename": "src/routes/users.ts",    "groupTitle": "Users",    "name": "GetUsersFace_photo"  },  {    "type": "GET",    "url": "/users/identity",    "title": "User's identity file",    "group": "Users",    "version": "1.0.0",    "filename": "src/routes/users.ts",    "groupTitle": "Users",    "name": "GetUsersIdentity"  },  {    "type": "post",    "url": "/users/face_photo",    "title": "Upload user's face photo file",    "group": "Users",    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "file",            "description": "<p>base64 file</p>"          }        ]      }    },    "filename": "src/routes/users.ts",    "groupTitle": "Users",    "name": "PostUsersFace_photo"  },  {    "type": "post",    "url": "/users/identity",    "title": "Upload user's identity file",    "group": "Users",    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "file",            "description": "<p>base64 file</p>"          }        ]      }    },    "filename": "src/routes/users.ts",    "groupTitle": "Users",    "name": "PostUsersIdentity"  },  {    "type": "post",    "url": "/users/sign_in",    "title": "Login",    "group": "Users",    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>user unique email.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>user password.</p>"          }        ]      }    },    "filename": "src/routes/users.ts",    "groupTitle": "Users",    "name": "PostUsersSign_in"  },  {    "type": "post",    "url": "/users/sign_up",    "title": "Create user",    "group": "Users",    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>Mandatory user unique email</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>{6..72} Mandatory user password</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "firstname",            "description": "<p>Mandatory user firstname</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "lastname",            "description": "<p>Mandatory user lastname</p>"          },          {            "group": "Parameter",            "type": "Date",            "optional": false,            "field": "birthdate",            "description": "<p>Mandatory user birthdate date format YYYY-mm-dd</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "birthplace",            "description": "<p>Mandatory user birthplace</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "adress",            "description": "<p>Mandatory user adress</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "city",            "description": "<p>Mandatory user city</p>"          },          {            "group": "Parameter",            "type": "Interger",            "optional": false,            "field": "postCode",            "description": "<p>Mandatory user poste code</p>"          }        ]      }    },    "filename": "src/routes/users.ts",    "groupTitle": "Users",    "name": "PostUsersSign_up"  }] });
