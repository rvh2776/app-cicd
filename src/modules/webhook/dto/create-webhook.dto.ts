export class CreateWebhookDto {
  callback_url: string;
  push_data: {
    pushed_at: number;
    pusher: string;
    tag: string;
  };
  repository: {
    comment_count: number;
    date_created: Date;
    description: string;
    dockerfile: string;
    full_description: string;
    is_official: boolean;
    is_private: boolean;
    is_trusted: boolean;
    name: string;
    namespace: string;
    owner: string;
    repo_name: string;
    repo_url: string;
    star_count: number;
    status: string;
  };
}
