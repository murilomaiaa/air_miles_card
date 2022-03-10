import { BaseEntity, BaseEntityProps } from './BaseEntity';
import { Group, GroupProps } from './Group';

export type CustomerProps = BaseEntityProps & {
  name: string;
  email: string;
  password: string;
  group: GroupProps | Group;
};

export class Customer extends BaseEntity {
  private name: string;
  private email: string;
  private password: string;
  private group: Group;

  constructor(props: CustomerProps) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.group = props.group instanceof Group ? props.group : new Group(props.group);
  }
}
