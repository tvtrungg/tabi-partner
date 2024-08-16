export default [
  {
    path: "/",
    layout: false,
    exact: true,
    component: "../layouts/QueryClientLayout",
    routes: [
      {
        path: "/",
        layout: false,
        component: "../layouts/RootLayout",
        routes: [
          {
            path: "/company",
            exact: true,
            component: "./Company",
          },
          {
            path: "/branches",
            exact: true,
            routes: [
              {
                path: "/branches",
                exact: true,
                component: "./Branches",
              },
              {
                path: "/branches/:id",
                exact: true,
                component: "./BranchDetails",
              },
              {
                path: "/branches/create",
                exact: true,
                component: "./CreateBranch",
              },
            ],
          },
          {
            path: "/room-types",
            exact: true,
            component: "./RoomTypes",
          },
          {
            path: "/branch",
            exact: true,
            component: "./BranchDetails",
          },
          {
            path: "/rooms",
            exact: true,
            routes: [
              {
                path: "/rooms",
                exact: true,
                component: "./Rooms",
              },
              {
                path: "/rooms/create",
                exact: true,
                component: "./CreateRoom",
              },
              {
                path: "/rooms/:id",
                exact: true,
                component: "./RoomDetails",
              },
            ],
          },
          {
            path: "/bookings",
            exact: true,
            component: "./Bookings",
          },
          {
            path: "/",
          },
        ],
      },
      {
        path: "/",
        layout: false,
        component: "../layouts/LandingLayout",
        routes: [
          {
            path: "/sign-in",
            exact: true,
            component: "./SignIn",
          },
          {
            path: "/sign-up",
            layout: false,
            exact: true,
            component: "./SignUp",
            routes: [
              {
                path: "/sign-up/rp",
                exact: true,
                component: "./SignUp/SignUpRP",
                routes: [
                  {
                    path: "/sign-up/rp/step-1",
                    exact: true,
                    component: "./SignUp/StepContents/Step1Content",
                  },
                  {
                    path: "/sign-up/rp/step-2",
                    exact: true,
                    component: "./SignUp/StepContents/Step2Content",
                  },
                  {
                    path: "/sign-up/rp/step-3",
                    exact: true,
                    component: "./SignUp/StepContents/Step3Content",
                  },
                  {
                    path: "/sign-up/rp",
                    redirect: "/sign-up/rp/step-1",
                  },
                ],
              },
              {
                path: "/sign-up/hst",
                exact: true,
                component: "./SignUp/SignUpHST",
              },
              {
                path: "/sign-up",
                exact: true,
              },
            ],
          },
        ],
      },
      {
        path: "/",
        redirect: "/sign-in",
      },
    ],
  },
  {
    path: "*",
    layout: false,
    component: "./404",
  },
];
