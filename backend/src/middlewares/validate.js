export function validate(schema, source = "body") {

  return (req, res, next) => {

    const result = schema.safeParse(req[source]);


    if (!result.success) {

      const errors = result.error.issues.map((issue) => ({

        field: issue.path.join(".") || "root",

        message: issue.message

      }));


      return res.status(400).json({

        message: "Validation failed",

        errors

      });

    }


    req.validated = {

      ...req.validated,

      [source]: result.data

    };

    next();

  };

}