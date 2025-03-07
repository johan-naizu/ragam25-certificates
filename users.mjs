"use strict";
import axios from "axios";
import { readFile, writeFile } from "fs";
import pkg from "crypto-js";
const { MD5 } = pkg;
import { SingleBar, Presets } from "cli-progress";
import { getJsonFromCsv } from "convert-csv-to-json";
import { writeJsonFile } from "write-json-file";
const JWT = process.env.JWT;
const BAKCEND_URL = "https://api.ragam.co.in";
const query = `query UsersPermissionsUsers(
  $filters: UsersPermissionsUserFiltersInput
  $pagination: PaginationArg
  $sort: [String]
) {
  usersPermissionsUsers(
    filters: $filters
    pagination: $pagination
    sort: $sort
  ) {
    data {
      id
      attributes {
        email
        name
        college
        registeredWorkshops {
          data {
            attributes {
              workshop {
                data {
                  attributes {
                    name
                  }
                }
              }
              verifed
            }
          }
        }
        registeredEvents {
          data {
            attributes {
              verifed
              event {
                data {
                  attributes {
                    name
                  }
                }
              }
            }
          }
        }
        registeredLectures {
          data {
            attributes {
              lecture {
                data {
                  attributes {
                    name
                  }
                }
              }
              verified
            }
          }
        }
        registeredCompetitions {
          data {
            attributes {
              verifed
              data
              competition {
                data {
                  attributes {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
`;
const variables = {
  sort: ["email:asc"],
  filters: {
    or: [
      {
        registeredLectures: {
          id: {
            notNull: true,
          },
          verified: {
            eq: true,
          },
        },
      },
      {
        registeredWorkshops: {
          id: {
            notNull: true,
          },
          verifed: {
            eq: true,
          },
        },
      },
      {
        registeredEvents: {
          id: {
            notNull: true,
          },
          verifed: {
            eq: true,
          },
        },
      },
      {
        registeredCompetitions: {
          id: {
            notNull: true,
          },
          verifed: {
            eq: true,
          },
        },
      },
    ],
  },
};

const URL = `${BAKCEND_URL}/graphql`;

let count = 0;

const bar = new SingleBar({}, Presets.shades_classic);

let errors = [];
const userData = async (page, pageSize) => {
  try {
    variables["pagination"] = {
      page,
      pageSize,
    };
    const { data } = await axios.post(
      URL,
      {
        query,
        variables,
      },
      {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      },
    );
    const pageCnt =
      data["data"]["usersPermissionsUsers"]["meta"]["pagination"]["pageCount"];
    bar.setTotal(pageCnt);

    data["data"]["usersPermissionsUsers"]["data"]?.forEach((userTemp) => {
      count++;
      const user = userTemp?.attributes;
      const json = {
        email: user?.email,
        name: user?.name,
        college: user?.college,
        workshops: user?.registeredWorkshops?.data?.map((workshop) => {
          return {
            name: workshop?.attributes?.workshop?.data?.attributes?.name,
            verified: workshop?.attributes?.verifed,
          };
        }),
        events: user?.registeredEvents?.data?.map((event) => {
          return {
            name: event?.attributes?.event?.data?.attributes?.name,
            verified: event?.attributes?.verifed,
          };
        }),
        lectures: user?.registeredLectures?.data?.map((lecture) => {
          return {
            name: lecture?.attributes?.lecture?.data?.attributes?.name,
            verified: lecture?.attributes?.verified,
          };
        }),
        competitions: user?.registeredCompetitions?.data?.map((competition) => {
          return {
            name: competition?.attributes?.competition?.data?.attributes?.title,
            verified: competition?.attributes?.verifed,
            data: competition?.attributes?.data?.competition,
          };
        }),
      };
      let temp = [];
      json?.competitions?.forEach((competition) => {
        if (competition.name === "Comm Reg") {
          competition.data?.forEach((comp) => {
            if (Array.isArray(comp.team)) {
              comp.team.forEach(async (mem) => {
                let hash = MD5(mem?.email)?.toString();
                readFile(`ragam25-users/${hash}.json`, async (err, data) => {
                  if (err) {
                    // console.error(err)
                    await writeJsonFile(`ragam25-users/${hash}.json`, {
                      name: mem.name,
                      college: mem.college,
                      competitions: [],
                      workshops: [],
                      events: [],
                    });
                  }
                });
                let json2 = {};
                try {
                  json2 = JSON.parse(data) || { competitions: [] };
                } catch (error) {
                  // console.error(error)
                  // console.log(mem.email, hash)
                }
                if (json2.competitions === undefined) {
                  json2.competitions = [];
                }
                json2?.competitions?.push({
                  name: comp.title,
                  verified: true,
                });
                await writeJsonFile(`ragam25-users/${hash}.json`, json2);
              });
            } else {
              temp.push(comp);
            }
          });
        } else {
          temp.push(competition);
        }
      });

      json.competitions = temp;

      const hash = MD5(user?.email)?.toString();

      writeFile(`ragam25-users/${hash}.json`, JSON.stringify(json), () => {
        errors.push(user?.email);
      });
    });
    bar.update(page);

    if (
      page ==
      data["data"]["usersPermissionsUsers"]["meta"]["pagination"]["pageCount"]
    ) {
      return;
    }
    return await userData(page + 1, pageSize);
  } catch (error) {
    console.error(error);
  }
};

const investElixirCertificates = () => {
  let iv_users = getJsonFromCsv("invest_elixir.csv");

  iv_users.forEach(async (user) => {
    const hash = MD5(user?.email)?.toString();
    readFile(`ragam25-users/${hash}.json`, async (err, data) => {
      if (err) {
        await writeJsonFile(`ragam25-users/${hash}.json`, {
          name: user.name,
          college: user.college,
          competitions: [],
          workshops: [],
          events: [],
        });
      }
    });
    let json2 = {};
    try {
      json2 = JSON.parse(data) || { competitions: [] };
    } catch (error) {
      // console.error(error)
      // console.log(mem.email, hash)
      // exit(0)
    }
    json2.name = user?.name;
    json2.college = user?.college;
    if (json2.competitions === undefined) {
      json2.competitions = [];
    }
    json2?.competitions?.push({
      name: "Invest Elixir",
      verified: true,
    });
    await writeJsonFile(`ragam25-users/${hash}.json`, json2);
  });
};

new Promise(async (resolve, reject) => {
  bar.start(200, 0);
  await userData(1, 100);
  bar.stop();
  investElixirCertificates();
  console.log(count, " users");
  console.log(errors);
}).then(() => {
  console.log("done");
});
