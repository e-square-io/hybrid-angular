import { ActivatedRoute, Data, Params } from "@angular/router";

export function getRouteData(route: ActivatedRoute): { data?: Data, params?: Params } {
  let child = route.firstChild;

  while (child) {
    if (child.firstChild) {
      child = child.firstChild;
    } else {
      return { data: child.snapshot.data, params: child.snapshot.params };
    }
  }

  return {};
}
