define({ "api": [
  {
    "type": "post",
    "url": "/project",
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
            "type": "Integer",
            "optional": false,
            "field": "interests",
            "description": "<p>Mandatory The interests decided for the refund.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"valid\"",
              "\"unvalid\""
            ],
            "optional": false,
            "field": "state",
            "description": "<p>Mandatory Project's description.</p>"
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
    "filename": "routes/projects.js",
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
    "filename": "routes/projects.js",
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
    "filename": "routes/projects.js",
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
    "filename": "routes/projects.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get all the user",
    "group": "User",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "filename": "routes/users.js",
    "groupTitle": "User",
    "name": "GetUsers"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create a new user",
    "group": "User",
    "version": "1.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User",
    "name": "PostUsers"
  }
] });
