define({ "api": [
  {
    "type": "post",
    "url": "/offers",
    "title": "Create a new offer",
    "version": "1.0.0",
    "name": "CreateOffer",
    "description": "<p>Create a new offer</p>",
    "group": "Offer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "project_id",
            "description": "<p>Mandatory Project's id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n    \"user\": {\n        \"id\": \"56a407a0-2527-4981-9e8c-d44f93b0a8f3\",\n        \"email\": \"samantha.chery@hetic.net\",\n        \"admin\": false\n    },\n    \"project\": {\n        \"id\": \"61476be1-fc5f-4e20-ab0a-c8395bd8a45c\",\n        \"title\": \"Un vélo\",\n        \"description\": \"svp c'est pour bb\",\n        \"price\": 300,\n        \"interests\": 0.1,\n        \"state\": \"unvalid\",\n        \"timeLaps\": 3,\n        \"createdDate\": \"2019-03-14T08:49:43.790Z\"\n    },\n    \"state\": \"waiting\",\n    \"id\": \"e2cdf473-8e19-46e1-95ed-f89ca4a74f23\",\n    \"createdDate\": \"2019-03-14T12:48:38.294Z\",\n    \"signed_by_owner\": false,\n    \"signed_by_investor\": false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/offers.ts",
    "groupTitle": "Offer"
  },
  {
    "type": "get",
    "url": "/offers",
    "title": "Get all the offers",
    "version": "1.0.0",
    "name": "Offers",
    "description": "<p>Get all the offers</p>",
    "group": "Offer",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   [{\n    \"user\": {\n        \"id\": \"56a407a0-2527-4981-9e8c-d44f93b0a8f3\",\n        \"email\": \"samantha.chery@hetic.net\",\n        \"admin\": false\n    },\n    \"project\": {\n        \"id\": \"61476be1-fc5f-4e20-ab0a-c8395bd8a45c\",\n        \"title\": \"Un vélo\",\n        \"description\": \"svp c'est pour bb\",\n        \"price\": 300,\n        \"interests\": 0.1,\n        \"state\": \"unvalid\",\n        \"timeLaps\": 3,\n        \"createdDate\": \"2019-03-14T08:49:43.790Z\"\n    },\n    \"state\": \"waiting\",\n    \"id\": \"e2cdf473-8e19-46e1-95ed-f89ca4a74f23\",\n    \"createdDate\": \"2019-03-14T12:48:38.294Z\",\n    \"signed_by_owner\": false,\n    \"signed_by_investor\": false\n}]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/offers.ts",
    "groupTitle": "Offer"
  },
  {
    "type": "post",
    "url": "/projects",
    "title": "Create a new project",
    "version": "1.0.0",
    "name": "CreateProject",
    "description": "<p>Create a new project</p>",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Mandatory Project's title.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Mandatory Project's description.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "price",
            "description": "<p>Mandatory Amount wanted by the borrower.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "interests",
            "description": "<p>Mandatory The interests decided for the refund.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "timeLaps",
            "description": "<p>Mandatory Number of month choose for the refund process duration.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"id\":1,\n     \"title\":\"Un vélo pour Sam\",\n     \"user_uid\":3,\n     \"price\":200,\n     \"timeLaps\":3,\n     \"description\":\"Résolution 2019 ! Aller à mon travail en vélo, mais j'ai pas de vélo...\",\n     \"interests\":\"0%\",\n     \"state\":\"valid\",\n     \"createdAt\":\"2019-01-03T11:36:58.540Z\"\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/projects.ts",
    "groupTitle": "Project"
  },
  {
    "type": "post",
    "url": "/projects/funded",
    "title": "Project has been founded",
    "version": "1.0.0",
    "name": "FoundedProject",
    "description": "<p>Link a project to an investor and update the status</p>",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "projectId",
            "description": "<p>Mandatory Id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "investorId",
            "description": "<p>Mandatory Id of the investor.</p>"
          }
        ]
      }
    },
    "filename": "src/routes/projects.ts",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/projects/:id",
    "title": "Get details on a project",
    "version": "1.0.0",
    "name": "Project",
    "description": "<p>Get details on a project</p>",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "id",
            "description": "<p>id of the project</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"id\":1,\n     \"title\":\"Un vélo pour Sam\",\n     \"user_uid\":3,\n     \"price\":200,\n     \"timeLaps\":3,\n     \"description\":\"Résolution 2019 ! Aller à mon travail en vélo, mais j'ai pas de vélo...\",\n     \"interests\":\"0%\",\n     \"state\":\"valid\",\n     \"createdAt\":\"2019-01-03T11:36:58.540Z\"\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/projects.ts",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/projects",
    "title": "Get all the valid projects",
    "version": "1.0.0",
    "name": "Projects",
    "description": "<p>Get all the valid projects</p>",
    "group": "Project",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n     \"id\":1,\n     \"title\":\"Un vélo pour Sam\",\n     \"user_uid\":3,\n     \"price\":200,\n     \"timeLaps\":3,\n     \"description\":\"Résolution 2019 ! Aller à mon travail en vélo, mais j'ai pas de vélo...\",\n     \"interests\":\"0%\",\n     \"state\":\"valid\",\n     \"createdAt\":\"2019-01-03T11:36:58.540Z\"\n    }]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/projects.ts",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get all the user",
    "group": "Users",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "filename": "src/routes/users.ts",
    "groupTitle": "Users",
    "name": "GetUsers"
  },
  {
    "type": "GET",
    "url": "/users/projects",
    "title": "User projects",
    "group": "Users",
    "version": "1.0.0",
    "filename": "src/routes/users.ts",
    "groupTitle": "Users",
    "name": "GetUsersProjects"
  },
  {
    "type": "post",
    "url": "/users/sign_in",
    "title": "Login",
    "group": "Users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>user unique email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>user password.</p>"
          }
        ]
      }
    },
    "filename": "src/routes/users.ts",
    "groupTitle": "Users",
    "name": "PostUsersSign_in"
  },
  {
    "type": "post",
    "url": "/users/sign_up",
    "title": "Create a new user",
    "group": "Users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>user unique email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>user password.</p>"
          }
        ]
      }
    },
    "filename": "src/routes/users.ts",
    "groupTitle": "Users",
    "name": "PostUsersSign_up"
  }
] });
